import {
Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useLocalSearchParams  } from 'expo-router';
import { useCallback, useState } from 'react'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';

const JobDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const tabs = ["About", "Ualifications", "Responsibilities"];

  const { data, isLoading, error, refresh } = useFetch('job-details', {job_id: params.id})
  
  const [refreshing, setRefreshing ] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
    const onRefresh = () => {}
    const displayTabContent = () => {
        switch (activeTab) {
            case "Ualifications":
                return <Specifics 
                title="Ualifications"
                points={data[0].job_highlights?.Qualifications ?? ['N/A']} 
                />
            case "About":
                return <JobAbout
                info={data[0].job_description ?? "No data provided"}
                />
            case "Responsibilities":
                return <Specifics 
                title="Responsibilites"
                points={data[0].job_highlights?.Responsibilities ?? ['N/A']} 
                />

        
            default:
                break;
        }
    }
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}
    
    
    >
        <Stack.Screen
        options={{
            headerStyle: { backgroundColor: COLORS.lightWhite},
            headerShadowVIsible: false,
            headerBackVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
                />
            ),
            headerRight: () => (
                <ScreenHeaderBtn
                iconUrl={icons.share}
                dimension="60%"
                />
            ),
            headerTitle: '',
        }}
        />
    <>
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}>
        {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />

        ) : error ? (

            <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
            <Text>No data</Text>
        ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100}}>
                <Company 
                companyLogo={data[0].employed_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employed_name}
                Location={data[0].job_country}


                />
                <JobTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {displayTabContent()}

            </View>
        )}
    </ScrollView>
    {/* <JobFooter url={data[0].job_google_link ?? 'https://careers.google.com/jobs/results'} /> */}
    {!isLoading && data?.[0] && (
          <JobFooter
            url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"}
          />
        )}
    </>

    </SafeAreaView>
  )
}

export default JobDetails
