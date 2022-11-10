const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(10)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message}`)
    }

    return data;
  } catch(err) {
      throw err;
  }
}

export const deleteProductJSON = async function(url) {
  try {
    const res = await Promise.race([fetch(url, { method: 'DELETE' }), timeout(10)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message}`)
    }

    return data;
  } catch(err) {
      throw err;
  }
} 


export const editProductJSON = async function(url, productData) {
  //console.log(productData)
  try {
    const res = await Promise.race([fetch(url, { 
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: productData.title,
        price: productData.price
      })
    }), timeout(10)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message}`)
    }

    return data;
  } catch(err) {
      throw err;
  }
}