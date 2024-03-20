export const WIN_COMMAND =
  "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
export const UNIX_COMMAND = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
export const REFRESH_INTERVAL = 100;
export const LOG_TO_FILE_INTERVAL = 60000;
