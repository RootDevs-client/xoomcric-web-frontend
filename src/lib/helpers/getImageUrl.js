export default function getImageUrl(id, width = 25, height = 18) {
  return `https://static.cricbuzz.com/a/img/v1/${Math.floor(
    width
  )}x${Math.floor(height)}/i1/c${id}/bangladesh.jpg`;
}
