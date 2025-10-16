import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { userId, quizQuestionId, userAnswer, isCorrect, timeSpent } = body;

    if (!userId || !quizQuestionId || !userAnswer || isCorrect === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Record quiz attempt
    const { data: attempt, error } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id: userId,
        quiz_question_id: quizQuestionId,
        user_answer: userAnswer,
        is_correct: isCorrect,
        time_spent_seconds: timeSpent || 0,
        attempted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error recording quiz attempt:", error);
      return NextResponse.json(
        { success: false, error: "Failed to record quiz attempt" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    console.error("Quiz attempts API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const quizQuestionId = searchParams.get("quizQuestionId");

    let query = supabase.from("quiz_attempts").select("*");

    if (userId) {
      query = query.eq("user_id", userId);
    }
    if (quizQuestionId) {
      query = query.eq("quiz_question_id", quizQuestionId);
    }

    const { data: attempts, error } = await query.order("attempted_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error fetching quiz attempts:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch quiz attempts" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: attempts || [],
    });
  } catch (error) {
    console.error("Quiz attempts API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
