import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Test() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        ShadCN Test Page
      </h1>

      {/* Card */}
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This card checks if ShadCN card components are working.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Label htmlFor="test-input">Test Input</Label>
          <Input id="test-input" placeholder="Type something..." />

          <Button className="bg-primary-90">Test Button</Button>
        </CardContent>
      </Card>

      {/* Standalone Button */}
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
}