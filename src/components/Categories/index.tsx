import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  CubeIcon,
  WalletIcon,
  UserPlusIcon,
  UserMinusIcon,
} from 'react-native-heroicons/outline';
import classNames from 'classnames';

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}: any) {
  const Icons = [CubeIcon, WalletIcon, UserPlusIcon, UserMinusIcon];
  return (
    <View className="p-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat: string, index: number) => {
          const IconCat = Icons[index];
          let isActive = cat === activeCategory;
          let activeButtonClass = isActive ? ' bg-amber-400' : ' bg-black/10';
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat)}
              className={classNames(
                'flex items-center space-y-1',
                // activeButtonClass,
              )}
            >
              <View className={'rounded-full p-[6px] ' + activeButtonClass}>
                <IconCat className="text-neutral-900" />
                {/* <Image
                  source={{ uri: 'https://picsum.photos/200' }}
                  style={{ width: hp(4), height: hp(4) }}
                  className="rounded-full"
                /> */}
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
