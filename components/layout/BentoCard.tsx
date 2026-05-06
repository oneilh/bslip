import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BentoCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
}

export function BentoCard({
  title,
  description,
  children,
  className,
  headerAction,
  footer,
}: BentoCardProps) {
  return (
    <Card className={cn("flex flex-col bg-card border shadow-sm rounded-[10px] overflow-hidden transition-all duration-200", className)}>
      {(title || description || headerAction) && (
        <CardHeader className="flex flex-row items-start justify-between pb-4 space-y-0">
          <div className="space-y-1.5">
            {title && <CardTitle className="text-lg font-semibold">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </CardHeader>
      )}
      <CardContent className="flex-1 px-6 pb-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="bg-muted/10 border-t px-6 py-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
