import React, {useEffect, useState, useRef, useMemo} from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {Badge, Box, VStack} from 'native-base';
import {BadgeComponentProps, Station} from '../utils/types';
import debounce from 'lodash.debounce';
import {Sizes} from '../constants/sizes';
import dayjs from 'dayjs';
import {Colors} from '../constants/colors';
import StationService from '../services/stationsService';
import Ebike from '../assets/images/ebike.png';
import MechanibalBike from '../assets/images/mechanical-bike.png';
import LocationImage from '../assets/images/location.png';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {getDistance} from '../utils/global';

interface StationCardProps {
  station: Station;
}

const stationService = new StationService();

const StationCard: React.FC<StationCardProps> = React.memo(({station}) => {
  const [updatedStation, setUpdatedStation] = useState<Station | null>(station);
  const cardRef = useRef<Element | null>(null);
  const userLocation = useSelector((state: RootState) => state.auth.location);
  const {width} = useWindowDimensions();
  const isMobile = width < 600;

  const fetchStationById = async (stationId: number) => {
    try {
      const updatedStationData = await stationService.getStation(
        stationId.toString(),
      );
      const {data} = updatedStationData.data;
      setUpdatedStation(data);
    } catch (error) {
      console.error('Error fetching station data:', error);
    }
  };

  const debouncedFetch = debounce(fetchStationById, 1000);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          debouncedFetch(station.station_id as number);
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [station.station_id, debouncedFetch]);

  const BadgeTopComponent = ({children, ...props}: BadgeComponentProps) => {
    return (
      <Badge
        colorScheme="success"
        rounded="full"
        variant="solid"
        mb={-4}
        mr={-2}
        zIndex={1}
        alignSelf="flex-end"
        {...props}>
        {children}
      </Badge>
    );
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          fontSize: Sizes.h6,
        },
        locationImage: {
          width: isMobile ? Sizes.h0 * 0.5 : Sizes.h0,
          height: isMobile ? Sizes.h0 * 0.5 : Sizes.h0,
        },
      }),
    [isMobile],
  );

  const BadgeBottomComponent = ({children, ...props}: BadgeComponentProps) => {
    return (
      <Badge
        colorScheme="warning"
        background={'transparent'}
        rounded="full"
        variant="solid"
        mt={-4}
        mr={-4}
        zIndex={1}
        alignSelf={'flex-end'}
        {...props}>
        {children}
      </Badge>
    );
  };

  return (
    <Box ref={cardRef}>
      <Box
        style={styles.card}
        bg={{
          linearGradient: Colors.linearGradientGreenBlack,
        }}>
        <View style={styles.cardRow}>
          <Text style={[styles.title, dynamicStyles.title]}>
            {updatedStation?.name}
          </Text>

          <View style={styles.locationRow}>
            <Image
              source={{uri: LocationImage}}
              style={[styles.locationImage, dynamicStyles.locationImage]}
            />
            <Text style={styles.stationDistance}>
              {getDistance(
                userLocation?.lat,
                userLocation?.lng,
                updatedStation?.lat,
                updatedStation?.lon,
              )}{' '}
              Km
            </Text>
          </View>
        </View>

        <View style={styles.cardCenter}>
          <VStack>
            <BadgeTopComponent>
              <Text style={styles.subTitle}>
                {updatedStation?.num_bikes_available_types?.[0].mechanical}
              </Text>
            </BadgeTopComponent>
            <Image
              source={{uri: MechanibalBike}}
              style={styles.mechanicalBike}
            />
            <BadgeBottomComponent>
              <Text style={styles.subTitle}>MB</Text>
            </BadgeBottomComponent>
          </VStack>

          <VStack>
            <BadgeTopComponent>
              <Text style={styles.subTitle}>
                {updatedStation?.num_bikes_available_types?.[1].ebike}
              </Text>
            </BadgeTopComponent>
            <Image source={{uri: Ebike}} style={styles.ebike} />
            <BadgeBottomComponent>
              <Text style={styles.subTitle}>EB</Text>
            </BadgeBottomComponent>
          </VStack>
        </View>

        <View style={styles.lastReported}>
          <Text style={styles.lastReportedText}>
            updated on{' '}
            {dayjs
              .unix(updatedStation?.last_reported as number)
              .format('Do MMMM YYYY [at] HH:mm')}
          </Text>
        </View>
      </Box>
    </Box>
  );
});

const styles = StyleSheet.create({
  card: {
    marginVertical: Sizes.fixPadding,
    padding: Sizes.fixPadding * 1.5,
    borderRadius: Sizes.fixPadding,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Sizes.fixPadding,
  },
  locationRow: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2,
  },
  title: {
    fontSize: Sizes.h5,
    fontFamily: 'Montserrat-Bold',
    color: Colors.darkGray,
  },
  subTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.darkGray,
  },
  stationDistance: {
    fontSize: Sizes.h6,
    fontFamily: 'Montserrat-Regular',
    color: Colors.darkGray,
  },
  lastReported: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Sizes.fixPadding * 2,
  },
  lastReportedText: {
    fontSize: Sizes.h7,
    fontFamily: 'Montserrat-Regular',
    color: Colors.darkGray,
  },
  mechanicalBike: {
    width: Sizes.h0 * 2.8,
    height: Sizes.h0 * 2.8,
    resizeMode: 'contain',
  },
  ebike: {
    width: Sizes.h0 * 3.5,
    height: Sizes.h0 * 3,
    resizeMode: 'contain',
    marginLeft: Sizes.fixPadding * 2,
  },
  locationImage: {
    resizeMode: 'contain',
    marginRight: Sizes.fixPadding,
  },
});

export default StationCard;
