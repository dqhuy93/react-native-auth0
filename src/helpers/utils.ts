export const logData = (value: any) => {
  console.log('----START----');
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    console.log(JSON.stringify(value, null, 2));
  } else {
    console.log(value);
  }
  console.log('----END----');
  console.log('-----------');
};

export const responseMessage = (error: any) => {
  return error?.message ?? 'Something went wrong!';
};
