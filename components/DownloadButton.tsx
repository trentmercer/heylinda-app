import React, { useState, useEffect } from 'react'
import { AntDesign as Icon } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'

import { useMeditation, useAppDispatch } from '../hooks'
import { filepaths, reset } from '../redux/meditationSlice'
import { store } from '../redux/store'
import { useFiles } from '../hooks/useFiles'

export default function DownloadButton(props: any) {
  const id = props.id
  const meditation = useMeditation(id)
  const uri = meditation?.uri || ''
  const [audioFiles, setAudioFiles] = useState<string[]>([])
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const filename = (path: string) => {
    let filename = path.split('/').pop()
    if (!filename) {
      return
    }
    return filename
  }

  useEffect(() => {

    if ( loading ) {
      useFiles('.mp3').then(paths => {

        // Set initial state for meditationSlice here
        // should set the filepaths attribute with an array of device filepath names

        setLoading(false)
      })
    }
  }, [audioFiles, useFiles, downloaded, dispatch, meditation])

  const saveAudioFile = async () => {
    let base = await FileSystem.documentDirectory
    if (!base || !meditation) {
      return
    }

    FileSystem.makeDirectoryAsync(base + 'audio')

    const path = base + '/audio/' + filename(meditation.uri)

    FileSystem.downloadAsync(uri, path).then((res) => {
      if (res.status === 200) {
        dispatch(filepaths(path))
        setDownloaded(true)
      }
    })
  }

  if (!loading && downloaded) {
    return <Icon name="checkcircleo" style={{ marginTop: 10 }} size={15} color="black" />
  } else {
    return (
      <Icon
        name="download"
        style={{ marginTop: 10 }}
        size={15}
        color="black"
        onPress={saveAudioFile}
      />
    )
  }
}
