"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface ExpirationItem {
  title: string;
  description: string;
  status: string;
}

export function UpcomingExpiration({
  notification,
}: {
  notification: ExpirationItem[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        {notification && notification.length > 0 ? (
          <div className="space-y-3">
            {notification.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Bell
                      className={
                        item.title.includes("Expired")
                          ? "text-red-500"
                          : "text-yellow-400"
                      }
                      size={16}
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
