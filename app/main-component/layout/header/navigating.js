'use client';

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

export default function Navigating() {
  return (
    <NavigationMenu >
      <NavigationMenuList className="text-primary gap-6 bg-white">
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            PAGE1
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Content for PAGE1 */}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            PAGE2
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Content for PAGE2 */}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
