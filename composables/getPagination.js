export default function getPagination(page, items) {
  const from = page * items
  const to = from + items - 1

  return { from, to }
}