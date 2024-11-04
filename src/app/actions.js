import { revalidatePath } from 'next/cache';

export async function revalidatePathHandler(path) {
  revalidatePath(path);
}
