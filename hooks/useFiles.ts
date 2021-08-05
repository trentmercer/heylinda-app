import * as FileSystem from 'expo-file-system'

export const useFiles = async (filetype: string) => {
  if (!filetype) {
    return undefined
  }

  let base = FileSystem.documentDirectory || ''

  ensureDirExists(base + 'audio/')

  let fs = FileSystem.readDirectoryAsync(base + 'audio/')

  let result = fs.then((files) => {
    let audioFiles = files.filter((file) => file.includes(filetype))
    return audioFiles
  })

  return result
}

export async function ensureDirExists(dir :string) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

export const useFilepath = async(filename: string) => {
    if ( !filename ) {return undefined} 

    let fs = await FileSystem.readDirectoryAsync( FileSystem.documentDirectory || '')

    let result = fs.includes(filename)

    console.log(result)

    return result
}

export async function deleteAllAudio() {
  const audioDir = FileSystem.documentDirectory + 'audio/';
  await FileSystem.deleteAsync(audioDir);
}