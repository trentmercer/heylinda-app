import * as React from 'react'
import { Alert } from 'react-native'
import { Divider, List } from 'react-native-paper'
import { useAppDispatch } from '../../hooks'
import { reset } from '../../redux/meditationSlice'
import { deleteAllAudio } from '../../hooks/useFiles'

const Settings = () => {
  const dispatch = useAppDispatch()
  const removeFiles = () => {
    Alert.alert(
      'Clear Files',
      'Are you sure you want to delete your files? All your stats will be reset. This cannot be undone.',
      [
        {
          text: 'Remove Files',
          onPress: () => deleteAllAudio(),
          style: 'destructive',
        },
        {
          text: 'Cancel',
        },
      ]
    )
  }

  const clearData = () => {
    Alert.alert(
      'Clear Data',
      'Are you sure you want to delete your data? All your stats will be reset. This cannot be undone.',
      [
        {
          text: 'Clear Data',
          onPress: () => dispatch(reset()),
          style: 'destructive',
        },
        {
          text: 'Cancel',
        },
      ]
    )
  }
  return (
    <>
      <List.Item title="Clear Data" onPress={clearData} />
      <List.Item title="Remove Files" onPress={removeFiles} />
      <Divider />
    </>
  )
}

export default Settings
