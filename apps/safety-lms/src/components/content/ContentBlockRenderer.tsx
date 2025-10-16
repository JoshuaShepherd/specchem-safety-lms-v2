"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Quote,
  AlertCircle,
} from "lucide-react";

// Content block types from database schema
export type ContentBlockType =
  | "hero"
  | "text"
  | "card"
  | "image"
  | "table"
  | "list"
  | "grid"
  | "callout"
  | "quote"
  | "divider"
  | "video"
  | "audio";

export interface ContentBlock {
  id: string;
  section_id: string;
  block_type: ContentBlockType;
  order_index: number;
  content: Record<string, any>;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ContentInteraction {
  blockId: string;
  interactionType:
    | "view"
    | "click"
    | "expand"
    | "collapse"
    | "download"
    | "share";
  metadata?: Record<string, any>;
}

interface ContentBlockRendererProps {
  block: ContentBlock;
  sectionId: string;
  onInteraction?: (interaction: ContentInteraction) => void;
}

// Hero Block Component
function HeroBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { badge, title, subtitle } = content;
  const backgroundClass =
    metadata?.background === "gradient-blue"
      ? "bg-gradient-to-r from-blue-600 to-blue-800"
      : "bg-gradient-to-r from-gray-600 to-gray-800";

  return (
    <div className={`${backgroundClass} text-white rounded-lg p-8 mb-6`}>
      {badge && (
        <Badge
          variant="secondary"
          className="mb-4 bg-white/20 text-white border-white/30"
        >
          {badge}
        </Badge>
      )}
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-xl opacity-90">{subtitle}</p>}
    </div>
  );
}

// Text Block Component
function TextBlock({ content }: { content: any }) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}

// Card Block Component
function CardBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { title, description, items } = content;

  return (
    <Card className="mb-6">
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardHeader>
      {items && (
        <CardContent>
          <div className="grid gap-4">
            {items.map((item: any, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Image Block Component
function ImageBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { src, alt, caption } = content;

  return (
    <div className="mb-6">
      <img
        src={src}
        alt={alt || ""}
        className="w-full rounded-lg shadow-sm"
        loading="lazy"
      />
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}

// Table Block Component
function TableBlock({ content }: { content: any }) {
  const { headers, rows } = content;

  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        <thead>
          <tr className="bg-muted">
            {headers.map((header: string, index: number) => (
              <th
                key={index}
                className="border border-border p-3 text-left font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string[], rowIndex: number) => (
            <tr key={rowIndex} className="hover:bg-muted/50">
              {row.map((cell: string, cellIndex: number) => (
                <td key={cellIndex} className="border border-border p-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// List Block Component
function ListBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { items, type = "unordered" } = content;
  const isOrdered = type === "ordered";

  return (
    <div className="mb-6">
      {isOrdered ? (
        <ol className="list-decimal list-inside space-y-2">
          {items.map((item: string, index: number) => (
            <li key={index} className="text-foreground">
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {items.map((item: string, index: number) => (
            <li key={index} className="text-foreground">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Grid Block Component
function GridBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { items, columns = 2 } = content;
  const gridCols =
    columns === 3
      ? "grid-cols-1 md:grid-cols-3"
      : columns === 4
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`grid ${gridCols} gap-4 mb-6`}>
      {items.map((item: any, index: number) => (
        <Card key={index} className="p-4">
          <CardContent className="p-0">
            {item.title && <h4 className="font-medium mb-2">{item.title}</h4>}
            {item.content && (
              <p className="text-sm text-muted-foreground">{item.content}</p>
            )}
            {item.image && (
              <img
                src={item.image}
                alt={item.title || ""}
                className="w-full rounded mt-2"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Callout Block Component
function CalloutBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { title, content: calloutContent } = content;
  const type = metadata?.type || "info";

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "error":
        return <AlertCircle className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "tip":
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "tip":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "warning":
        return "text-yellow-800 dark:text-yellow-200";
      case "error":
        return "text-red-800 dark:text-red-200";
      case "success":
        return "text-green-800 dark:text-green-200";
      case "tip":
        return "text-blue-800 dark:text-blue-200";
      default:
        return "text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className={`${getBgColor()} border rounded-lg p-4 mb-6`}>
      <div className="flex items-start gap-3">
        <div className={`${getTextColor()} mt-0.5`}>{getIcon()}</div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-medium ${getTextColor()} mb-2`}>{title}</h4>
          )}
          <div className={`${getTextColor()} whitespace-pre-line`}>
            {calloutContent}
          </div>
        </div>
      </div>
    </div>
  );
}

// Quote Block Component
function QuoteBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { quote, author, title: authorTitle } = content;

  return (
    <div className="border-l-4 border-primary bg-muted/30 rounded-r-lg p-6 mb-6">
      <blockquote className="text-lg italic mb-4">"{quote}"</blockquote>
      {author && (
        <div className="flex items-center gap-2">
          <Quote className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">{author}</p>
            {authorTitle && (
              <p className="text-sm text-muted-foreground">{authorTitle}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Divider Block Component
function DividerBlock({ metadata }: { metadata?: any }) {
  const style = metadata?.style || "default";

  if (style === "dotted") {
    return <div className="border-t-2 border-dotted border-border my-6" />;
  } else if (style === "thick") {
    return <div className="border-t-4 border-border my-6" />;
  }

  return <div className="border-t border-border my-6" />;
}

// Video Block Component
function VideoBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { src, title, description } = content;

  return (
    <div className="mb-6">
      <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full"
          controls
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {title && <h4 className="font-medium mt-2">{title}</h4>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// Audio Block Component
function AudioBlock({ content, metadata }: { content: any; metadata?: any }) {
  const { src, title, description } = content;

  return (
    <div className="mb-6 p-4 border rounded-lg">
      <audio controls className="w-full mb-2">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
      {title && <h4 className="font-medium">{title}</h4>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// Main ContentBlockRenderer Component
export function ContentBlockRenderer({
  block,
  sectionId,
  onInteraction,
}: ContentBlockRendererProps) {
  const handleInteraction = (
    interactionType: ContentInteraction["interactionType"],
    metadata?: any
  ) => {
    if (onInteraction) {
      onInteraction({
        blockId: block.id,
        interactionType,
        metadata,
      });
    }
  };

  const renderBlock = () => {
    switch (block.block_type) {
      case "hero":
        return <HeroBlock content={block.content} metadata={block.metadata} />;
      case "text":
        return <TextBlock content={block.content} />;
      case "card":
        return <CardBlock content={block.content} metadata={block.metadata} />;
      case "image":
        return <ImageBlock content={block.content} metadata={block.metadata} />;
      case "table":
        return <TableBlock content={block.content} />;
      case "list":
        return <ListBlock content={block.content} metadata={block.metadata} />;
      case "grid":
        return <GridBlock content={block.content} metadata={block.metadata} />;
      case "callout":
        return (
          <CalloutBlock content={block.content} metadata={block.metadata} />
        );
      case "quote":
        return <QuoteBlock content={block.content} metadata={block.metadata} />;
      case "divider":
        return <DividerBlock metadata={block.metadata} />;
      case "video":
        return <VideoBlock content={block.content} metadata={block.metadata} />;
      case "audio":
        return <AudioBlock content={block.content} metadata={block.metadata} />;
      default:
        return (
          <div className="mb-6 p-4 border border-dashed border-muted-foreground rounded-lg">
            <p className="text-muted-foreground text-center">
              Unsupported block type: {block.block_type}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="content-block"
      data-block-id={block.id}
      onMouseEnter={() => handleInteraction("view")}
    >
      {renderBlock()}
    </div>
  );
}

// Export individual components for testing
export {
  HeroBlock,
  TextBlock,
  CardBlock,
  ImageBlock,
  TableBlock,
  ListBlock,
  GridBlock,
  CalloutBlock,
  QuoteBlock,
  DividerBlock,
  VideoBlock,
  AudioBlock,
};
