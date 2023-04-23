import config from "../../config"

export const getMessages = async (message: string) => {
  try {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message
        })
    }
    const response = await fetch(`${config.api.url}/completions`, options)
    const data = await response.json()
    return data;
  } catch (error) {
    console.error(error)
    return null;
  }
}
