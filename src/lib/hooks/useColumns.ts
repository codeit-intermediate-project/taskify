import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { deleteColumn, postColumn, putColumn } from '@core/api/columnApis';
import { DashBoardContext } from '@core/contexts/DashboardContext';
import showSuccessNotification from '@lib/utils/notifications/showSuccessNotification';

export default function useColumns() {
  const [targetColumnId, setTargetColumnId] = useState(0);
  const { dashboardid } = useParams();
  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onTouched' });
  const { columnList, setColumnList } = useContext(DashBoardContext);

  const validateColumn = (title: string) => {
    const hasSameName = columnList.some(column => column.title === title);
    if (hasSameName) {
      setError('title', { message: '컬럼 명이 중복되었습니다.' });
      setError('editedTitle', { message: '컬럼 명이 중복되었습니다.' });
      return false;
    }
    if (columnList && columnList.length >= 10) {
      setError('title', { message: '컬럼은 최대 10개까지만 생성 가능합니다.' });
      setError('editedTitle', {
        message: '컬럼은 최대 10개까지만 생성 가능합니다.',
      });
      return false;
    }
    return true;
  };
  // 컬럼 생성 로직
  const onSubmitCreateColumnForm = async (title: string) => {
    const validateResult = validateColumn(title);
    if (!validateResult) {
      return false;
    }
    const formData = {
      title,
      dashboardId: Number(dashboardid),
    };
    const createdColumn = await postColumn(formData);
    if (!createdColumn) {
      return false;
    }
    // 생성한 컬럼은 로컬에서 바로 추가된다 (새로 패치해오는게 나을까)
    setColumnList(prev => [...prev, createdColumn]);
    showSuccessNotification({ message: '컬럼이 생성 되었습니다.' });
    return true;
  };

  // 컬럼 수정 로직
  const onSubmitEditColumnForm = async (editedTitle: string) => {
    const beforeColumn = columnList.find(
      column => column.id === targetColumnId
    );
    if (beforeColumn?.title === editedTitle) {
      return true;
    }
    const validateResult = validateColumn(editedTitle);
    if (!validateResult) {
      return false;
    }

    const formData = {
      title: editedTitle,
    };

    const editedColumn = await putColumn({
      columnId: targetColumnId,
      formData,
    });
    const updatedColumnList = columnList.map(column =>
      column.id === targetColumnId ? editedColumn : column
    );
    setColumnList(updatedColumnList);
    showSuccessNotification({ message: '컬럼이 수정 되었습니다.' });
    return true;
  };

  // 컬럼 삭제 로직
  const onClickDeleteAtEditModal = async () => {
    await deleteColumn(targetColumnId);
    const deletedColumnList = columnList.filter(
      column => column.id !== targetColumnId
    );
    setColumnList(deletedColumnList);
    showSuccessNotification({ message: '컬럼이 삭제 되었습니다.' });
  };

  return {
    onSubmitCreateColumnForm,
    register,
    errors,
    handleSubmit,
    setValue,
    clearErrors,
    setTargetColumnId,
    onSubmitEditColumnForm,
    onClickDeleteAtEditModal,
  };
}
