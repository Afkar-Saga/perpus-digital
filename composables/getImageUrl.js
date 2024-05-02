import { filename } from 'pathe/utils'

export default function(image) {
  try {
    // const imageUrl = new URL(`/assets/img/${image}`, import.meta.url).href;
    const glob = import.meta.glob('@/assets/img/*', { eager: true })
    const images = Object.fromEntries(
      Object.entries(glob).map(([key, value]) => [filename(key), value.default])
    )
    return images[image];
  } catch (error) {
    console.error(error);
  }
}