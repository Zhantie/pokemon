import React, { ComponentProps } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ComponentProps<typeof SafeAreaView>;

/**
 * Our own SafeAreaView.
 * - To prevent importing the wrong one (RN vs react-native-safe-area-context)
 * - To make it easy to swap it out later
 * - To be able to build our own if react-native-safe-area-context turns out to be a 💩
 * - To be able to be "smart" and check for a header itself
 */
export default function MySafeAreaView({ children, ...props }: Props) {
  return <SafeAreaView {...props}>{children}</SafeAreaView>;
}