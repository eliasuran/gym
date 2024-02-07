'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { type Set } from '../../utils/exercises';
import { Icon } from '@iconify/react';
import { Input } from '../Input';

export default function AddSetInfo(props: {
  exercise_id: string;
  set: Set[];
  setSet: Dispatch<SetStateAction<Set[]>>;
}) {
  const [km, setKm] = useState('');
  const [time, setTime] = useState('');
  return (
  );
}
