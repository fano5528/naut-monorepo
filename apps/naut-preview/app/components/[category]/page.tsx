import { nautComponents } from "@/nautComponents";
import dynamic from "next/dynamic";
import React from "react";

// Component factory that dynamically creates importers based on nautComponents
const createComponentImporter = (category: string) => {
  // Create object to hold dynamic imports for components
  const importers: Record<string, any> = {};
  
  // Get the components list for this category
  const components = nautComponents[category as keyof typeof nautComponents] || [];
  
  // Create dynamic imports for each component in this category
  components.forEach((component: any) => {
    // Define the dynamic import for this specific component
    importers[component.name] = dynamic(
      // Use a function that returns the import to prevent template string scanning
      () => {
        // Hard-code the category path to avoid template string scanning
        switch(category) {
          case 'banners':
            return import(`@/components/banners/${component.name}`);
          case 'blocks':
            return import(`@/components/blocks/${component.name}`);
          case 'footers':
            return import(`@/components/footers/${component.name}`);
          case 'headers':
            return import(`@/components/headers/${component.name}`);
          case 'heroes':
            return import(`@/components/heroes/${component.name}`);
          default:
            throw new Error(`Unknown category: ${category}`);
        }
      },
      {
        loading: () => <div className="text-center py-10">Loading component...</div>,
        ssr: true
      }
    );
  });
  
  return importers;
};

export default async function ComponentsPage({ params }: { params: Promise<{ category: string }> }) {
  const category = (await params).category;
  const categoryComponents = nautComponents[category as keyof typeof nautComponents] || [];
  
  // Get component mappings for this category
  const componentImporters = createComponentImporter(category);

  return (
    <div>
      <h1 className="text-white text-4xl font-bold text-center py-32 bg-color1">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="w-full mt-10">
        {categoryComponents.length > 0 ? (
          categoryComponents.map((component: any, index: number) => {
            // Get the specific component from our mapping
            const Component = componentImporters[component.name];
            
            // If component doesn't exist in our mapping, render placeholder
            if (!Component) {
              return (
                <div key={index} className="text-center py-5">
                  Component {component.name} not found in mappings
                </div>
              );
            }

            return (
              <div key={index}>
                <Component {...component.props} edit={false} reference={Object.keys(component.props).reduce((acc: any, key: string) => {
                  acc[key] = key;
                  return acc;
                }, {})} />
              </div>
            );
          })
        ) : (
          <div className="text-center py-10">No components found in this category</div>
        )}
      </div>
    </div>
  );
}