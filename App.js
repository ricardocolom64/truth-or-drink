import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack, Text, Box, HStack, Button, Spacer, Center, ChevronRightIcon, ArrowForwardIcon, ArrowBackIcon, Divider } from 'native-base';
import { StyleSheet, View, Image } from 'react-native';

import NativeConstants from 'expo-constants';

import sampleCard from "./assets/images/on-the-rocks/(5).png"

import onTheRocksCards from './OnTheRocksCards';
import extraDirtyCards from './ExtraDirtyCards';
import happyHourCards from './HappyHourCards';
import lastCallCards from './LastCallCards';

/* ----- TO DO -----

Separate onPress methods into proper function calls, it looks messy currently; something like handleNext, handleShuffle, etc.

Allow for the different categories to be selected and work properly.

Add option to view instuctions

*/

export default function App() {

  const [category, setCategory] = useState(0);

  const [onTheRocks, setOnTheRocks] = useState([]);
  const [onTheRocksIndex, setOnTheRocksIndex] = useState(0);

  const [extraDirty, setExtraDirty] = useState([]);
  const [extraDirtyIndex, setExtraDirtyIndex] = useState(0);

  const [happyHour, setHappyHour] = useState([]);
  const [happyHourIndex, setHappyHourIndex] = useState(0);

  const [lastCall, setLastCall] = useState([]);
  const [lastCallIndex, setLastCallIndex] = useState(0);

  useEffect(() => {
    setOnTheRocks([]);
    setOnTheRocks((arr) => [...arr, ...onTheRocksCards]);
  }, [])

  return (
    <NativeBaseProvider>
      <View style={styles.statusBar}>
        <StatusBar style='auto' />
      </View>
      <View style={styles.container}>
        <Spacer />
        <Box w="100%" alignItems={"center"}>
          <HStack w="130" bg="white" shadow={4} borderWidth={2} justifyContent={"space-between"} p="1">
            <Box>
              <Text fontWeight={"extrabold"}>TRUTH</Text>
            </Box>
            <Center>
              <Box>
                <Text fontWeight={"extrabold"} fontSize="8">OR</Text>
              </Box>
            </Center>
            <Box>
              <Text fontWeight={"extrabold"}>DRINK</Text>
            </Box>
          </HStack>
        </Box>
        <VStack m="3" w="90%" h="80%">
          <Spacer />
          <Center>
            <Box w="80%">
              <VStack >
                <HStack mb="1" w="100%">
                  <Button size="xs" p="2" colorScheme="indigo" shadow={4}>
                    <Text fontWeight={"extrabold"} color="white">ON THE ROCKS</Text>
                  </Button>
                  <Spacer />
                  <Button size="xs" p="2" colorScheme="red" shadow={4}>
                    <Text fontWeight={"extrabold"} color="white">EXTRA DIRTY</Text>
                  </Button>
                  <Spacer />
                  <Spacer />
                </HStack>
                <HStack mt="1" w="100%">
                  <Spacer />
                  <Spacer />
                  <Button size="xs" p="2" colorScheme="yellow" shadow={4}>
                    <Text fontWeight={"extrabold"} color="white">HAPPY HOUR</Text>
                  </Button>
                  <Spacer />
                  <Button size="xs" p="2" colorScheme="darkBlue" shadow={4}>
                    <Text fontWeight={"extrabold"} color="white">LAST CALL</Text>
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Center>
          <Spacer />
          <Center>
            <Box bg="white" rounded="8" shadow={4} borderWidth="1" borderColor="coolGray.400" w="344">
              <Center>
                <Image style={styles.gameCard} source={onTheRocks[onTheRocksIndex]} resizeMode="contain" borderRadius={8} />
              </Center>
            </Box>
          </Center>
          <Spacer />
          <Center>
            <HStack w="342">
              <Button size="xs" p="2" colorScheme="blueGray" shadow={4} onPress={() => {
                if (onTheRocksIndex == 0)
                  setOnTheRocksIndex(onTheRocks.length - 1);
                else
                  setOnTheRocksIndex(onTheRocksIndex - 1);

                console.log(onTheRocksIndex);
              }}>
                <HStack>
                  <Center>
                    <ArrowBackIcon color="white" />
                  </Center>
                  <Text fontWeight={"extrabold"} color="white">  PREV</Text>
                </HStack>
              </Button>
              <Spacer />
              <Button size="xs" p="2" px="8" colorScheme="green" shadow={4} onPress={() => {

                var arrCopy = onTheRocks;

                for (var i = arrCopy.length - 1; i > 0; i--) {
                  var j = Math.floor(Math.random() * (i + 1));
                  var temp = arrCopy[i];
                  arrCopy[i] = arrCopy[j];
                  arrCopy[j] = temp;
                }

                setOnTheRocks([]);
                setOnTheRocks((arr) => [...arr, ...arrCopy]);

                setOnTheRocksIndex(0);

                console.log(onTheRocks[0]);
              }}>
                <Text fontWeight={"extrabold"} color="white">SHUFFLE</Text>
              </Button>
              <Spacer />
              <Button size="xs" p="2" colorScheme="blueGray" shadow={4} onPress={() => {
                if (onTheRocksIndex == onTheRocks.length - 1)
                  setOnTheRocksIndex(0);
                else
                  setOnTheRocksIndex(onTheRocksIndex + 1);

                console.log(onTheRocksIndex);
              }}>
                <HStack>
                  <Text fontWeight={"extrabold"} color="white">NEXT  </Text>
                  <Center>
                    <ArrowForwardIcon color="white" />
                  </Center>
                </HStack>
              </Button>
            </HStack>
          </Center>
          <Spacer />
        </VStack>
        <Divider w="90%" />
        <Spacer />
        <Center>
          <Text color="coolGray.400">
            App by Rick tell him thanks :)
          </Text>
        </Center>
        <Spacer />
        <Spacer />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  statusBar: {
    height: NativeConstants.statusBarHeight,
  },
  gameCard: {
    width: 342,
    height: 488,
  }
});
