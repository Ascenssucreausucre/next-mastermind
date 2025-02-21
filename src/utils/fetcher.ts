const fetcher = async (url: RequestInfo, init?: RequestInit) => {
    const response = await fetch(url, {
      ...init
    });

    const payload= await response.json()
    if (!response.ok) {
      throw new Error('Erreur lors du fetching des données');
    }
  
    return {
      payload: payload,

      status: response.status
    }
  };

export default fetcher;