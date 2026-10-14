import * as fs from 'fs';
import * as path from 'path';

/**
 * CSV Reader Helper
 * Reads test data from CSV files and returns values as an array
 */

/**
 * Read test data from a CSV file based on test identifier
 * @param testIdentifier - The identifier to match in the CSV file (first column)
 * @param testdataFilePath - Path to the CSV file
 * @returns Array of values from the matching row (excluding the test identifier)
 */
export function csvRead(testIdentifier: string, testdataFilePath: string): string[] {
  // Resolve the file path relative to the project root
  const absolutePath = path.isAbsolute(testdataFilePath)
    ? testdataFilePath
    : path.join(process.cwd(), testdataFilePath);

  // Read the CSV file
  const csvContent = fs.readFileSync(absolutePath, 'utf-8');

  // Split into lines and remove empty lines
  const lines = csvContent.trim().split('\n').filter(line => line.trim() !== '');

  // Parse each line
  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());

    // Check if the first value matches the test identifier
    if (values[0] === testIdentifier) {
      // Return the remaining values (excluding the test identifier)
      return values.slice(1);
    }
  }

  // If no matching row found, throw an error
  throw new Error(
    `No matching row found for test identifier '${testIdentifier}' in file '${testdataFilePath}'`
  );
}
