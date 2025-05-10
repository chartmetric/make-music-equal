
export async function fetchData(url, metricName) {
    const response = await fetch(url);
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
  
    const data = rows.slice(1).map(row => {
      const values = row.split(',');
  
      return {
        [metricName]: values[0].trim(),
        he_him: Number(values[1].trim()) || 0,
        she_her: Number(values[2].trim()) || 0,
        they_them: Number(values[3].trim()) || 0
      };
    });
  
    return data;
  }
  