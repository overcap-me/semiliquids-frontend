import { useCallback, useEffect, useState } from "react";

export const useCalcHeading = () => {
  const [activeSection, setActiveSection] = useState(null); // Текущая активная секция
  const [sections, setSections] = useState([]); // Динамически найденные заголовки h2

  // Функция для обработки видимости заголовков h2
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    // Находим все заголовки h2
    const headers = Array.from(
      document.querySelectorAll("article h2, article h3"),
    );

    // Обновляем состояние для хранения найденных заголовков
    setSections(
      headers.map((header) => ({
        id: header.id,
        tag: header.nodeName,
        label: header.innerText,
      })),
    );

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Порог 50%, чтобы элемент считался видимым
    });

    // Наблюдаем за каждым h2 элементом
    headers.forEach((header) => {
      observer.observe(header);
    });

    // Очистка наблюдателя при размонтировании компонента
    return () => {
      headers.forEach((header) => {
        observer.unobserve(header);
      });
    };
  }, [handleIntersection]);

  return {
    activeSection,
    sections,
  };
};
