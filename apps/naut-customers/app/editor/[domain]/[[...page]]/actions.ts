"use server";

import { db } from '@/db';
import { content, site, headerContent } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function next(formData: FormData) {
  const formDataArray = Array.from(formData.entries());
  const editedArrayIds: number[] = [];
  const editedHeaderArrayIds: number[] = [];

  try {
    for (const input of formDataArray) {
      const inputKey = input[0];
      const inputValue = input[1];

      // If the key ends with _header, it's a header content
      if (inputKey.endsWith("_header")) {
        // Remove the _header suffix to get the actual contentId
        const contentIdStr = inputKey.slice(0, -7); // Remove "_header"
        
        if (/^\d+$/.test(contentIdStr)) {
          // It's a simple header content update
          const contentId = parseInt(contentIdStr);
          
          // Try to parse as JSON for navigation field, otherwise use as string
          let processedValue = inputValue;
          try {
            // If it's a valid JSON string, parse it to store as proper JSON
            const parsed = JSON.parse(inputValue as string);
            processedValue = parsed;
          } catch {
            // If not valid JSON, keep as string
            processedValue = inputValue;
          }
          
          const contentToUpdate = {
            payload: processedValue
          };
          await db.update(headerContent).set({ value: contentToUpdate }).where(eq(headerContent.id, contentId));
        }
      }
      // If the value starts with array_ and ends with _header, it's a header array
      else if (inputKey.startsWith("array_") && inputKey.endsWith("_header")) {
        const keyWithoutSuffix = inputKey.slice(0, -7); // Remove "_header"
        const contentId = parseInt(keyWithoutSuffix.slice(6).split(".")[0]);

        if (!editedHeaderArrayIds.includes(contentId)) {
          const unprocessedArray = formDataArray.filter((input) => input[0].startsWith(`array_${contentId}.`) && input[0].endsWith("_header"));

          const numbersInTheMiddle = unprocessedArray.map((input) => {
            const keyWithoutSuffix = input[0].slice(0, -7); // Remove "_header"
            return parseInt(keyWithoutSuffix.split(".")[1]);
          });
          const largestNumber = Math.max(...numbersInTheMiddle);
          const arrayLength = largestNumber + 1;
          const array = [];
          
          for (let i = 0; i < arrayLength; i++) {
            const arrayElementsWithSameNumber = unprocessedArray.filter((input) => {
              const keyWithoutSuffix = input[0].slice(0, -7); // Remove "_header"
              return parseInt(keyWithoutSuffix.split(".")[1]) === i;
            });
            const keys = arrayElementsWithSameNumber.map((input) => {
              const keyWithoutSuffix = input[0].slice(0, -7); // Remove "_header"
              return keyWithoutSuffix.split("-")[1];
            });
            const values = arrayElementsWithSameNumber.map((input) => input[1]);

            const keyValuePairs = keys.map((key, index) => [key, values[index]]);
            array.push(Object.fromEntries(keyValuePairs));
          }

          editedHeaderArrayIds.push(contentId);

          await db.update(headerContent)
            .set({ value: { payload: array } })
            .where(eq(headerContent.id, contentId));
        }
      }
      // If the value is a number, it is a contentId
      else if (/^\d+$/.test(inputKey)) {
        // Take the integer value of the contentId
        const contentId = parseInt(inputKey);

        // Update the content with the new value
        const contentToUpdate = {
          payload: inputValue
        };
        await db.update(content).set({ value: contentToUpdate }).where(eq(content.id, contentId));

      // If the value part of an array, construct the entire array and update the database
      } else if (inputKey.startsWith("array_")) {
        const contentId = parseInt(inputKey.slice(6).split(".")[0]);

        if (!editedArrayIds.includes(contentId)) {
          const unprocessedArray = formDataArray.filter((input) => input[0].startsWith(`array_${contentId}.`) && !input[0].endsWith("_header"));

          const numbersInTheMiddle = unprocessedArray.map((input) => parseInt(input[0].split(".")[1]));
          const largestNumber = Math.max(...numbersInTheMiddle);
          const arrayLength = largestNumber + 1;
          const array = [];
          
          for (let i = 0; i < arrayLength; i++) {
            const arrayElementsWithSameNumber = unprocessedArray.filter((input) => parseInt(input[0].split(".")[1]) === i);
            const keys = arrayElementsWithSameNumber.map((input) => input[0].split("-")[1]);
            const values = arrayElementsWithSameNumber.map((input) => input[1]);

            const keyValuePairs = keys.map((key, index) => [key, values[index]]);
            array.push(Object.fromEntries(keyValuePairs));
          }

          editedArrayIds.push(contentId);

          await db.update(content)
            .set({ value: JSON.stringify({ payload: array }) })
            .where(eq(content.id, contentId));
        }
      }
    }

    const domainString = formData.get('domain') as string;
    const siteData = await db.select().from(site).where(eq(site.domain, domainString));
    const projectName = siteData[0]?.projectId;
    const deployment = siteData[0]?.deploymentId;

    await fetch(`https://api.vercel.com/v13/deployments?teamId=${process.env.VERCEL_TEAM_ID}`, {
      method: "POST", 
      cache: "no-store",
      headers: {
        "Authorization": "Bearer " + process.env.VERCEL_TOKEN,
      },
      body: JSON.stringify({
        "name": projectName,
        "deploymentId": deployment,
        "target": "production"
      })
    });

    return { success: true };
  } catch (error) {
    console.error("Error deploying site:", error);
    return { success: false };
  }
} 