
export async function fetchData(url, metricName) {
    const response = await fetch(url);
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
  
    const data = rows.slice(1).map(row => {
      const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(value => value.replace(/^"|"$/g, '').trim());
  
      return {
        [metricName]: values[0].trim(),
        he_him: Number(values[1].trim()) || 0,
        she_her: Number(values[2].trim()) || 0,
        they_them: Number(values[3].trim()) || 0
      };
    });
  
    return data;
  }
  

  export async function fetchArticles(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
  
    const data = rows.slice(1).map(row => {
      const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(value => value.replace(/^"|"$/g, '').trim());
  
      return {
        name: values[1],
        published_at: new Date(values[2]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: values[3],
      };
    });
  
    return data;
  }
  
 export async function fetchTableData(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');

    const data = rows.slice(1).map(row => {
      const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(value => value.replace(/^"|"$/g, '').trim());

      return {
        chartmetric_rank: values[0]?.trim(),
        chartmetric_id: values[1]?.trim(),
        artist_name: values[2]?.trim(),
        chartmetric_url: values[3]?.trim(),
        country_name: values[4]?.trim(),
        composition: values[5]?.trim(),
        career_stage: values[6]?.trim(),
        pronouns: values[7]?.trim(),
        genre: values[8]?.trim(),
      };
    });

    return data;
}