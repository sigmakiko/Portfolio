import { createContext, useState, useContext } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [selectedCharacterIdx, setSelectedCharacterIdx] = useState(0);
  const [isPixelated, setIsPixelated] = useState(false);

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacterIdx,
        setSelectedCharacterIdx,
        isPixelated,
        setIsPixelated,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

// 3. Custom Hook لسهولة الاستخدام لاحقاً
export const useCharacter = () => useContext(CharacterContext);
