export function getCurrentDate(): string {
  const today = new Date();

  // Extract the day, month, and year
  const day = String(today.getDate()).padStart(2, '0');
  
  // getMonth() returns 0-11 (January is 0), so we must add 1
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  
  const year = today.getFullYear();

  // Combine them into the desired format
  return `${day}-${month}-${year}`;
}