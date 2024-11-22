import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ( {name, activeTab, onHandleSearchType}) => (
  <TouchableOpacity
  style={styles.btn(name, activeTab)}
  onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
)

const Tabs = ({ tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
    <FlatList
      data={tabs}
      horizontal // Make the tabs appear horizontally
      keyExtractor={(item) => item} // Use the tab name as the key
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ columnGap: SIZES.small / 2}}
      renderItem={({ item }) => (
        <TabButton
          name={item} // Pass the item as the name
          activeTab={activeTab} // Highlight the active tab
          onHandleSearchType={() => setActiveTab(item)} // Update active tab on press
        />
      )}
    />
  </View>
  )
}

export default Tabs