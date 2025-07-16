import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated, LayoutChangeEvent } from 'react-native';

interface RangeSliderProps {
  min: number;
  max: number;
  values: [number, number]; // [minimum, maximum]
  step?: number;
  onValuesChange: (values: [number, number]) => void;
  markerColor?: string;
  trackColor?: string;
  selectedTrackColor?: string;
  markerSize?: number;
  trackHeight?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  values,
  step = 1,
  onValuesChange,
  markerColor = '#3b82f6',
  trackColor = '#e5e7eb',
  selectedTrackColor = '#93c5fd',
  markerSize = 20,
  trackHeight = 6,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [minThumbPosition] = useState(new Animated.Value(0));
  const [maxThumbPosition] = useState(new Animated.Value(0));
  
  // تحويل القيمة إلى موضع على الشريط
  const valueToPosition = (value: number) => {
    const percentage = (value - min) / (max - min);
    return percentage * sliderWidth;
  };
  
  // تحويل الموضع إلى قيمة خاضعة للخطوة
  const positionToValue = (position: number) => {
    if (sliderWidth === 0) return min;
    const percentage = position / sliderWidth;
    const value = percentage * (max - min) + min;
    const steppedValue = Math.round(value / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };
  
  // تحديث موضع الأشرطة عند تغير القيم
  useEffect(() => {
    if (sliderWidth > 0) {
      minThumbPosition.setValue(valueToPosition(values[0]));
      maxThumbPosition.setValue(valueToPosition(values[1]));
    }
  }, [sliderWidth, values]);
  
  // التعامل مع المسك والسحب للمؤشر الأدنى
  const minPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      let newPosition = gestureState.moveX - markerSize / 2;
      newPosition = Math.max(0, Math.min(maxThumbPosition.__getValue() - markerSize / 2, newPosition));
      minThumbPosition.setValue(newPosition);
      const newValue = positionToValue(newPosition);
      if (newValue <= values[1] - step) {
        onValuesChange([newValue, values[1]]);
      }
    },
  });
  
  // التعامل مع المسك والسحب للمؤشر الأقصى
  const maxPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      let newPosition = gestureState.moveX - markerSize / 2;
      newPosition = Math.max(minThumbPosition.__getValue() + markerSize / 2, Math.min(sliderWidth, newPosition));
      maxThumbPosition.setValue(newPosition);
      const newValue = positionToValue(newPosition);
      if (newValue >= values[0] + step) {
        onValuesChange([values[0], newValue]);
      }
    },
  });
  
  // حساب عرض الشريط عند التحميل
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width - markerSize);
  };
  
  return (
    <View style={styles.container} onLayout={handleLayout}>
      {/* مسار الشريط الخلفي */}
      <View style={[styles.track, { backgroundColor: trackColor, height: trackHeight }]} />

      {/* مسار الشريط المحدد */}
      <Animated.View
        style={[
          styles.selectedTrack,
          {
            backgroundColor: selectedTrackColor,
            height: trackHeight,
            left: minThumbPosition,
            right: Animated.subtract(sliderWidth, maxThumbPosition),
          },
        ]}
      />

      {/* مؤشر الحد الأدنى */}
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: markerColor,
            width: markerSize,
            height: markerSize,
            borderRadius: markerSize / 2,
            left: Animated.subtract(minThumbPosition, markerSize / 2),
          },
        ]}
        {...minPanResponder.panHandlers}
      />

      {/* مؤشر الحد الأقصى */}
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: markerColor,
            width: markerSize,
            height: markerSize,
            borderRadius: markerSize / 2,
            left: Animated.subtract(maxThumbPosition, markerSize / 2),
          },
        ]}
        {...maxPanResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    width: '100%',
    borderRadius: 3,
    position: 'absolute',
  },
  selectedTrack: {
    position: 'absolute',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default RangeSlider;