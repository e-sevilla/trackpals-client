export default function commonMethods() {
  const datetimeToMillis = (datestring, timestring = null) => {
    let date = new Date(datestring)
    if (timestring){
      let time = timestring.split(":");
      date.setHours(Number(time[0]))
      date.setMinutes(Number(time[1]))
    };
    return Date.parse(date);
  };
  
  const millisToDatestring = (millis) => {
    return (new Date(millis)).toLocaleDateString();
  };
  
  const millisToTimestring = (millis) => {
    return (new Date(millis)).toLocaleTimeString().slice(0, -3);
  };

  // Funcion para pasar la imagen a base64, si no devuelve null
  const encodeFileAsBase64URL = async (file) => {
    if(file){
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                resolve(reader.result);
            });
            reader.readAsDataURL(file);
        });
    }
    else{
        return null;
    }
  };

  // Funcion para obtener el contenido del gpx, si no devuelve null
  const getGpxContent = async (file) => {
    if(file){
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                resolve(reader.result);
            });
            reader.readAsText(file);
        });
    }
    else{
        return null;
    }
  };

  const htmlToDirBBDD = (html) => {
    return html.split("<")
          .map(v => {
              let aux = v.split(">")
              return aux[aux.length -1].trim()
            })
          .filter(v => v != "")
          .join("::");
  };

  const dirBBDDToDir = (dirBBDD) => {
    return (dirBBDD) ? dirBBDD.split("::").join("\n") : null;
  };

  return { 
    datetimeToMillis, millisToDatestring, millisToTimestring,
    encodeFileAsBase64URL, getGpxContent,
    htmlToDirBBDD, dirBBDDToDir
  };
}