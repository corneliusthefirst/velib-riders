// StationList.tsx
import React, {useMemo, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import StationCard from './StationCard';
import {QueryPage, searchStationsInterface} from '../utils/types';
import StationService from '../services/stationsService';
import {CheckIcon, Select, Button, Icon} from 'native-base';
import {Sizes} from '../constants/sizes';
import {AntDesign} from '../assets/icons';
import {Colors} from '../constants/colors';
import CustomTextInput from './CustomTextInput';

const stationService = new StationService();

const StationList: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const isMobile = width <= 600;
  const [searchTerm, setSearchTerm] = useState('');
  const [bikeTypeFilter, setBikeTypeFilter] =
    useState<searchStationsInterface['bikeType']>('all');

  const fetchStations = async ({pageParam = 1}) => {
    const response = await stationService.searchStations({
      searchTerm,
      bikeType: bikeTypeFilter,
      page: pageParam,
    });
    return response.data;
  };

  const {data, fetchNextPage, refetch} = useInfiniteQuery(
    'stations',
    fetchStations,
    {
      getNextPageParam: (lastPage: QueryPage, allPages: QueryPage[]) => {
        const nextPage =
          lastPage.data?.length === 10 ? allPages.length + 1 : undefined;
        return nextPage;
      },
    },
  );

  const handleSearch = () => {
    refetch();
  };

  const handleBikeTypeChange = (value: searchStationsInterface['bikeType']) => {
    setBikeTypeFilter(value);
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        searchView: {
          flexDirection: isMobile ? 'column' : 'row',
          width: isMobile ? width : width * 0.7,
        },
        filterSearchView: {
          marginVertical: isMobile ? Sizes.fixPadding : 0,
          marginLeft: isMobile ? 0 : Sizes.fixPadding,
          width: isMobile ? '100%' : 'auto',
        },
        searchList: {
          width: isMobile ? width : width * 0.7,
          paddingHorizontal: Sizes.fixPadding * 2,
          height: isMobile ? height - 249 : height - 198,
        },
      }),
    [isMobile, width, height],
  );
  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyListView}>
        <Icon
          as={AntDesign}
          name="exclamationcircleo"
          color={Colors.primary}
          size={Sizes.h0 * 1.5}
        />
        <Text style={styles.emptyText}>No stations found</Text>
      </View>
    );
  };

  const onChangeText = async (value: string) => {
    if (value === '') {
      await refetch();
    }
    setSearchTerm(value);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchView, dynamicStyles.searchView]}>
        <View style={[styles.searchInput]}>
          <CustomTextInput
            name="searchTerm"
            placeholder="Search Bike Stations by Name"
            value={searchTerm}
            onChangeText={onChangeText}
          />
        </View>
        <View style={[styles.filterSearchView, dynamicStyles.filterSearchView]}>
          <View style={styles.bikeType}>
            <Select
              selectedValue={bikeTypeFilter}
              minWidth={100}
              color={Colors.white}
              backgroundColor={Colors.darkBlue}
              width={isMobile ? 'full' : '0.5'}
              accessibilityLabel="Select bike type"
              placeholder="Select bike type"
              dropdownIcon={
                <View style={styles.dropdownIcon}>
                  <Icon as={AntDesign} name="down" size="sm" />
                </View>
              }
              onValueChange={value =>
                handleBikeTypeChange(
                  value as searchStationsInterface['bikeType'],
                )
              }
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}>
              <Select.Item label="All" value="all" />
              <Select.Item label="Electric bike" value="ebike" />
              <Select.Item label="Manual bike" value="mechanical" />
            </Select>
          </View>
          <Button
            background={Colors.primary}
            style={styles.searchButton}
            onPress={handleSearch}
            leftIcon={<Icon as={AntDesign} name="search1" size="sm" />}>
            Search
          </Button>
        </View>
      </View>

      <FlatList
        contentContainerStyle={[styles.searchList, dynamicStyles.searchList]}
        data={
          data?.pages.flatMap((page: QueryPage) => {
            return page.data;
          }) || []
        }
        keyExtractor={(item, index) =>
          item?.stationCode || `${item?.stationCode}-${index}`
        }
        renderItem={({item}) => <StationCard station={item} />}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    width: '100%',
  },
  searchView: {
    display: 'flex',
    alignItems: 'center',
    marginTop: Sizes.fixPadding * 6,
    marginBottom: Sizes.fixPadding * 3,
    paddingHorizontal: Sizes.fixPadding * 2,
  },
  searchList: {},
  bikeType: {
    marginRight: Sizes.fixPadding,
  },
  searchButton: {
    height: 35,
  },
  dropdownIcon: {marginRight: Sizes.fixPadding},
  filterSearchView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyText: {
    fontSize: Sizes.h3,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: Sizes.fixPadding * 2,
    color: Colors.white,
  },
  emptyListView: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizes.fixPadding * 2,
  },
});

export default StationList;
