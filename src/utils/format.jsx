// 日期范围展示格式化
export const formatDateRange = (start, end) => {
  const startDate = new Date(start).toLocaleDateString();
  const endDate = new Date(end).toLocaleDateString();
  return `${startDate} → ${endDate}`;
};

export const formatedDate = date => {
  return new Date(date).toLocaleDateString();
};
