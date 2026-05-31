import { createContext, useContext, useState, useEffect } from 'react';

const BucketListContext = createContext();

export const BucketListProvider = ({ children }) => {
  const [bucketList, setBucketList] = useState(() => {
    const saved = localStorage.getItem('bucketList');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [visited, setVisited] = useState(() => {
    const saved = localStorage.getItem('visited');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bucketList', JSON.stringify(bucketList));
    localStorage.setItem('visited', JSON.stringify(visited));
  }, [bucketList, visited]);

  const toggleBucketList = (cca3) => {
    setBucketList(prev => 
      prev.includes(cca3) ? prev.filter(code => code !== cca3) : [...prev, cca3]
    );
  };

  const toggleVisited = (cca3) => {
    setVisited(prev => 
      prev.includes(cca3) ? prev.filter(code => code !== cca3) : [...prev, cca3]
    );
  };

  return (
    <BucketListContext.Provider value={{ bucketList, visited, toggleBucketList, toggleVisited }}>
      {children}
    </BucketListContext.Provider>
  );
};

export const useBucketList = () => useContext(BucketListContext);