class easyHttp {
    async get(url) {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    }
    async post(url, data) {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    }
    async put(url, data) {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    }
    async delete(url) {
       await fetch(url, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const responseData = await "deleted";
      return responseData;
    }
  }
  
  export const http=new easyHttp();