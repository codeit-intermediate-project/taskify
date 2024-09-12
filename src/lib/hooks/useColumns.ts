import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { deleteColumn, postColumn, putColumn } from '@core/api/columnApis';
import { DashBoardContext } from '@core/contexts/DashBoardContext';

export default function useColumns() {
  const [targetColumnId, setTargetColumnId] = useState(0);
  const { dashboardid } = useParams();
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onTouched' });
  const { columnList, setColumnList } = useContext(DashBoardContext);

  // 컬럼 갯수 10개 제한 (백엔드에서 10개 이상 생성안됨)
  const validateColumnCount = () => {
    if (columnList && columnList.length >= 10) {
      setError('title', { message: '컬럼은 최대 10개까지만 생성 가능합니다.' });
      return false;
    }
    return true;
  };
  // 컬럼 생성 로직
  const onSubmitCreateColumnForm = async (title: string) => {
    const validateResult = validateColumnCount();
    if (!validateResult) {
      return;
    }
    const formData = {
      title,
      dashboardId: Number(dashboardid),
    };
    const createdColumn = await postColumn(formData);
    if (!createdColumn) {
      return;
    }
    // 생성한 컬럼은 로컬에서 바로 추가된다 (새로 패치해오는게 나을까)
    setColumnList(prev => [...prev, createdColumn]);
  };
  // 컬럼 수정 로직
  const onSubmitEditColumnForm = async (editedTitle: string) => {
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
  }; // 다시확인
  // 컬럼 삭제 로직
  const onClickDeleteAtEditModal = async () => {
    await deleteColumn(targetColumnId);
    const deletedColumnList = columnList.filter(
      column => column.id !== targetColumnId
    );
    setColumnList(deletedColumnList);
  };

  return {
    onSubmitCreateColumnForm,
    register,
    errors,
    handleSubmit,
    setValue,
    setTargetColumnId,
    onSubmitEditColumnForm,
    onClickDeleteAtEditModal,
  };
}
