
// Define the Heavenly Stems (Cheongan) and Earthly Branches (Jiji)
const CHEONGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const JIJI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// Placeholder for a more sophisticated leap month calculation if needed
const isLeapMonth = (year, month) => {
  // Simplified placeholder logic
  return false;
};

/**
 * Calculates the Saju Palja (Four Pillars of Destiny) for a given date and time.
 * This is a simplified implementation and may need refinement for full astronomical accuracy.
 */
const calculateSaju = (year, month, day, hour) => {
  // 1. Calculate the Year Pillar (Yeonju)
  const yeonjuIndex = (year - 4) % 60; // Base year is 1924 (Gapja year)
  const yeonganIndex = yeonjuIndex % 10;
  const yeonjiIndex = yeonjuIndex % 12;
  const yeonju = CHEONGAN[yeonganIndex] + JIJI[yeonjiIndex];

  // 2. Calculate the Month Pillar (Wolju) - This is a simplified approximation
  // A precise calculation requires knowledge of solar terms (Jeolgi)
  const wolganIndex = ((year - 1924) * 12 + month - 1) % 10;
  const woljiIndex = (month - 1) % 12; // Very simplified, needs Jeolgi adjustment
  const wolju = CHEONGAN[wolganIndex] + JIJI[woljiIndex];

  // 3. Calculate the Day Pillar (Ilju) - Requires a base date and day count
  // This is a complex calculation. For now, we will use a placeholder.
  // A proper implementation would use a known reference date (e.g., Jan 1, 1924) and count the days.
  const baseDate = new Date('1924-02-05'); // Known Gapja day
  const targetDate = new Date(year, month - 1, day);
  const dayDifference = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  const iljuIndex = (dayDifference % 60 + 60) % 60; // +60 to handle negative results
  const ilganIndex = iljuIndex % 10;
  const iljiIndex = iljuIndex % 12;
  const ilju = CHEONGAN[ilganIndex] + JIJI[iljiIndex];


  // 4. Calculate the Time Pillar (Siju) - Based on the day's Cheongan and the hour
  const siganMap = {
    "甲": ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙"],
    "乙": ["丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁"],
    "丙": ["戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"],
    "丁": ["庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛"],
    "戊": ["壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    "己": ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙"],
    "庚": ["丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁"],
    "辛": ["戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"],
    "壬": ["庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛"],
    "癸": ["壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
  };
  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  const ilgan = CHEONGAN[ilganIndex];
  const sigan = siganMap[ilgan][hourIndex];
  const siju = sigan + JIJI[hourIndex];


  return {
    yeonju, // Year Pillar
    wolju,  // Month Pillar
    ilju,   // Day Pillar
    siju,   // Time Pillar
  };
};

module.exports = { calculateSaju };
