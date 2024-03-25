export default function(props) {
  try {
    const imageUrl = new URL(`/assets/img/${props.image}`, import.meta.url).href;
    return imageUrl;
  } catch (error) {
    console.error(error);
  }
}