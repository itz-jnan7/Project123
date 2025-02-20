import { Category } from '../types';

export const menuData: Category[] = [
  {
    name: 'Starters',
    items: [
      { name: 'CHILLI CHICKEN', price: 200, description: 'Crispy fried chicken tossed in a spicy and tangy sauce with bell peppers and onions.'},
  { name: 'DRAGON CHICKEN', price: 225, description: 'Spicy and crispy chicken strips stir-fried with chili sauce, cashews, and bell peppers.' },
  { name: 'CHICKEN 65', price: 235, description: 'Deep-fried South Indian-style spicy chicken bites marinated with yogurt and spices.' },
  { name: 'CHICKEN MANCHURIA', price: 225, description: 'Crispy chicken dumplings coated in a flavorful Manchurian sauce with garlic and soy.' },
  { name: 'CHICKEN KABAB', price: 180, description: 'Juicy and flavorful grilled chicken skewers marinated in a blend of aromatic spices.' },
  { name: 'VEG MANCHURIA', price: 150, description: 'Crispy fried vegetable dumplings tossed in a tangy and spicy Manchurian sauce.' },
  { name: 'PANEER 65', price: 165, description: 'Crispy fried paneer cubes coated in a spicy, tangy sauce with curry leaves and chilies.' },
    ]
  },
  {
    name: 'Soups',
    items: [
      { name: 'TOMATO SOUP', price: 230, description: 'Delicious concoction of fresh tomato and cream garnished with coriander' },
      { name: 'SWEET CORN SOUP (Veg)', price: 240, description: 'Corn soup cooked with fresh vegetables and cream' },
      { name: 'SWEET CORN SOUP (Chicken)', price: 250, description: 'Light soup made with sweet corn and chicken stock finished with cream' },
      { name: 'HOT & SOUR SOUP (Veg)', price: 240, description: 'Picked assortment of flavoured spices added to fresh vegetables' },
      { name: 'HOT & SOUR SOUP (Chicken)', price: 255, description: 'Flavoured spices cooked with chicken and fresh vegetables' },
      { name: 'VEG CLEAR SOUP', price: 230, description: 'Fresh vegetables cooked with Chinese spices' },
      { name: 'CHICKEN CLEAR SOUP', price: 240, description: 'Flavoured soup with chicken and Chinese spices' }
    ]
  },
  {
    name: 'Biryanis',
    items: [
      { name: 'CHICKEN BIRYANI', price: 330, description: 'Flavoursome basmati rice cooked with yakhni consisting of chicken pieces, potato and spices' },
      { name: 'CHICKEN SPECIAL BIRYANI (2pcs)', price: 480, description: 'Delicious Deccan delicacy prepared with two pieces of chicken, basmati rice potato with one egg and spices' },
      { name: 'MUTTON BIRYANI', price: 330, description: 'Flavoursome basmati rice cooked with mutton pieces, potato and spices' },
      { name: 'MUTTON SPECIAL BIRYANI (2pcs)', price: 480, description: 'Aramatic basmati rice cooked with two mutton pieces, potato with one egg and spices' },
      { name: 'CHICKEN TIKKA DUM BIRYANI (6pcs)', price: 510, description: 'Aromatic basmati rice with six pieces of chicken tikka, mixed with special spices and served in clay pot with raita' },
      { name: 'VEG BIRYANI', price: 265, description: 'Basmati rice cooked with mixed vegetables and spices served with raita' },
      { name: 'PANEER TIKKA DUM BIRYANI (6pcs)', price: 450, description: 'Aramatic basmati rice with six pieces of paneer tikka, mixed with special spices and served in clay pot with raita' },
      { name: 'EGG BIRYANI (2pcs Eggs)', price: 255, description: 'Basmati rice cooked with egg and spices served with raita' }
    ]
  },
  {
    name: 'Veg Curries',
    items: [
      { name: 'PANEER BUTTER MASALA', price: 235, description: 'Paneer cubes makhani gravy with cream and butter' },
      { name: 'PANEER MANCHURIAN', price: 235, description: 'Paneer cubes cooked with tomato, chopped onions, coriander leaves' },
      { name: 'VEG MANCHURIAN', price: 225, description: 'Crispy vegetable balls in a tangy, spicy Indo-Chinese sauce' },
      { name: 'PANEER CHILLY', price: 230, description: 'Paneer cubes cooked with, capsicum, onion, chilli with Chinese spices' },
      { name: 'PALAK PANEER', price: 260, description: 'Paneer cubes and spinach mixed with special herbs' },
      { name: 'MATAR PANEER', price: 245, description: 'Paneer cubes, green peas prepared in tomato gravy' },
      { name: 'KADAI PANEER', price: 260, description: 'Paneer cubes with makhani gravy and kadai roasted masala' },
      { name: 'MIXED VEGETABLE', price: 215, description: 'Mixed vegetable cooked with savoury cream and spices' }
    ]
  },
  {
    name: 'Non-veg Curries',
    items: [
      { name: 'CHICKEN KADAI', price: 335, description: 'Shredded chicken cooked with capsicum, Indian gravy and kadai masala' },
      { name: 'CHICKEN BUTTER MASALA (4pcs)', price: 320, description: 'Boneless chicken made along with makhani gravy and butter' },
      { name: 'DUM CHICKEN (4pcs)', price: 370, description: 'Chicken mixed with special herbs finished off by cooking on low flames' },
      { name: 'HYDRABADI CHICKEN (6pcs)', price: 415, description: 'Boneless chicken cooked with herbs finished off by cooking on low flames' }
    ]
  },
  {
    name: 'Roti & Naan',
    items: [
      { name: 'PLAIN ROTI', price: 25, description: 'Soft and freshly made whole wheat flatbread, perfect for pairing with curries.' },
  { name: 'PLAIN NAAN', price: 30, description: 'Soft and fluffy traditional Indian bread, baked in a tandoor oven.' },
  { name: 'BUTTER NAAN', price: 75, description: 'Soft tandoori naan brushed with rich butter for extra flavor.' },
  { name: 'GARLIC NAAN', price: 80, description: 'Tandoori naan infused with garlic and butter, giving it a rich aroma and taste.' }
    ]
  }
];