function useUtil() {
  function delSpace(str) {
    str = str.replace(/\s/g, '');
    return str;
  }

  return {
    delSpace,
  };
}

export default useUtil;
