import mongoose from 'mongoose';
import { Product } from '../models/Product.model.js';
import { env } from '../config/env.config.js';
import { connectDb, disconnectDb } from '../config/db.config.js';

const products = [
    // --- LAPTOPS ---
    {
        name: 'Blade 16 Ultimate',
        sku: 'LAP-BLADE-16-ULT',
        category: 'laptop',
        basePrice: 329900, // $3299
        stockQuantity: 50,
        availabilityStatus: 'in_stock',
        shortDescription: '16" QHD+ 240Hz OLED, RTX 4090, i9-13900HX',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCH232UXl_RpP9yyz4NDuBIOfV71HQ2YG2ygFMF-uL8O8FSl_fxrX5NT1pVSptSB7zlV7gjKgWwQLluu87yNrBXw0COkL9XzGwk6XnNE5YpOV4GOEaetB7O4eSGxTTH_qh2QajuEr3B79hq2jmY8_UI7wAyutPbBtRZ4BCIjaSaLNFKLM2u4ggKnnABOs4QNaovkJr8nbe__v_CcGquyXL2IQi__Oh-XG44ETGQkb2ot06_a1-jLLlXfebV3-u6eH2u84m4OpTOwOU'],
        specifications: {
            gpu: 'RTX 4090 (175W)',
            cpu: 'Intel Core i9-13900HX',
            screen: '16" QHD+ 240Hz OLED',
        },
    },
    {
        name: 'Stealth 14 Air',
        sku: 'LAP-STEALTH-14-AIR',
        category: 'laptop',
        basePrice: 179900,
        stockQuantity: 30,
        availabilityStatus: 'in_stock',
        shortDescription: '14" 2.8K 120Hz IPS, RTX 4070, AMD Ryzen 9 7940HS',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCg16Qcw2T3arKbNG-OgHvdaPlgANs_KV5BdG0ZYWNKufD1EOCmrpvbmhiWPY1U94ZwPiP5vbRJR4pVF9yTixifNHdeGi9W72Bk9kXw7V4AGBxIwJ4GNxQG3nhm4I5Mk0XhwR0Tt7QSO8sGBHKPEiagkNBsmt8N_yhvveAfzfLH6mtWZQm12LV6E4jbbxmgr3DHnS79_I6nNvWfthBUcEeEy_wPq7u66Oq2QHBs7ECpZjUtXinVARI9IjgFB0D39J88k--amPFyVvk'],
        specifications: {
            gpu: 'RTX 4070 (105W)',
            cpu: 'AMD Ryzen 9 7940HS',
            screen: '14" 2.8K 120Hz IPS',
        },
    },
    {
        name: 'Titan 18 Pro',
        sku: 'LAP-TITAN-18-PRO',
        category: 'laptop',
        basePrice: 289900,
        stockQuantity: 15,
        availabilityStatus: 'in_stock',
        shortDescription: '18" 4K 120Hz Mini-LED, RTX 4080, i9-13980HX',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0FRmqsqUeE7RgFkY1Q6IlojRHSVPRdGIyrCyFlmDqf7vyVEow5yVg4iXeDkaxUK7uZvGGG8G4J4JHnss6cuMVw4hjFRUkk2WteGjY1mDUn5V4-QyNO14ZebNMr58t0zfATMSxMjpga6fZ_y0WM12fyJRjLT_dNhdceyGskkrGn7tfEqBK2Sf4QlNaNpJ8ppnriIqQJQvHVBKkipX7ofOATqceLc65sjW-N5uydIuQKIYMxRVA2I3fgXgwkZ-0OUgnA5KsJFeHGRU'],
        specifications: {
            gpu: 'RTX 4080 (175W)',
            cpu: 'Intel Core i9-13980HX',
            screen: '18" 4K 120Hz Mini-LED',
        },
    },
    {
        name: 'Creator Z16',
        sku: 'LAP-CREATOR-Z16',
        category: 'laptop',
        basePrice: 159900,
        stockQuantity: 25,
        availabilityStatus: 'in_stock',
        shortDescription: '16" QHD+ Touch, RTX 4060 Studio, i7-13700H',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDydWVoz_RNaw6FDHT_HR8Z3qj0Minj79-e7hWFo2pigt82389BfKosrkSaOtkUvAadxuhjcDkDXJDgmhnpfs4Lv9T8DLiiKVndq_Hvwq667iqYs9Qy73lMlRbYSz-znI7Sl7JdpI03rmVKDKP42kSUiVA2HNfEbb7IEPe9XciKm96pEGDZbtggEQz4OwnETDFwQSq1-h96tkMxtJ_yqK0XlTEV8sbdG5T1SBnrf32MxwR2jQ5dlfzUniDHNszPcByZvRVsT-zAdHM'],
        specifications: {
            gpu: 'RTX 4060 Studio',
            cpu: 'Intel Core i7-13700H',
            screen: '16" QHD+ Touch',
        },
    },

    // --- ACCESSORIES ---
    {
        name: 'RigMaster K1 Pro',
        sku: 'ACC-KB-K1PRO',
        category: 'accessory',
        basePrice: 14900,
        stockQuantity: 100,
        availabilityStatus: 'in_stock',
        shortDescription: '75% Layout, Hot-swappable, RGB Backlight, Gasket Mount.',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDNLI7D9lI7ur_rZ44J1Z5r6pfSQQsyfJzsVcEMdZzg6Ku5ZMzr-C8hDp_gfocawS_6JYNwvO-RNZeX8kjRp6kRrHeHCQytLSSlTm1LT_Uy6P-AHpYapQst61zBNd2unWsFlO9dWeMVH6p4myvQz1b7EhnHOHtZn5GiXU0FC4YRBpE8hMNZBHNZYpRqrt6_zmPxD3DbwV1ZquWJ_QMKY789u9BwrY8KG4Hl756VOSt6eQ3vGW1TD-ZJ_3j3J-KOngHxvfk13wpcX2M'],
        specifications: { type: 'Keyboard' },
    },
    {
        name: 'Stealth Ops 100',
        sku: 'ACC-KB-OPS100',
        category: 'accessory',
        basePrice: 12900,
        discount: { type: 'percentage', value: 20 },
        stockQuantity: 80,
        availabilityStatus: 'in_stock',
        shortDescription: 'Full Size, Silent Red Switches, PBT Keycaps.',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB0mz7Ozmrxy29LcYLCrEc996o_BOmAGwwPBd1Gm9n-PpV6fsav-fwEZKRPoJbvhoRVZ7wV7nUyWoEW5iouylHP6HyRvT--HnJQQ0jHYxqppwmGHpJkRHdrhiuQ-ZQj9JvYSp3pjmg5TJNC4576hHmR-R0-QxWV86zz2USkgKumiyQAC5B9vRSbDqk4XTLX0f5NR4jzeNH_PFrsBBMGgzvFjQ7KvFT71f9qgvySnfAm8dD_jneSVKcpgvLGUthY30Q2G9jSZxqWPhg'],
        specifications: { type: 'Keyboard' },
    },
    {
        name: 'Viper Ultralight',
        sku: 'ACC-MSE-VIPER',
        category: 'accessory',
        basePrice: 7999,
        stockQuantity: 120,
        availabilityStatus: 'in_stock',
        shortDescription: '58g weight, 26K DPI Optical Sensor, Wireless.',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB29DIqEU4PKccTuz4HiGxn-ER3iTa20MfCZOnm9-37p8OPvwj2VRjXVvYe3Vp1H9TtydlBLNuCr4q6oOszpRF16xuaCpYLYTO6WJ16ThZKmNWF_5--l3c3z2v9KDeivCVjeCvlz7w8wHaejISUx71QRSebgTppkC8IMX5y5c2jy-vwVNFvIFhOv8-OKGKr4lEpkDeABV-5OwxjLI9ug3XU7r6owXLQX4gRcxKKxxjQ6BXnvF4jJcyHSd8yXZAzLF1520VbRvf3knA'],
        specifications: { type: 'Mouse' },
    },
    {
        name: 'Sonic Blast 7.1',
        sku: 'ACC-HSET-SONIC',
        category: 'accessory',
        basePrice: 8900,
        stockQuantity: 60,
        availabilityStatus: 'in_stock',
        shortDescription: '7.1 Surround Sound, Noise Cancelling Mic, 50mm Drivers.',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAYIQDH6yfZtOen2eIxnDC5SJYcsjjsF9O6AYWGQTHpewHAWD8CgSJHiYJptorYq8l4o1SV8B21eq4Iy9iTUoNq0l5dxCn3woR8mpcwtFPxbSxxnM89bBgnUwS9IHkK2SFjYqt3_xMdHOhAwZNBPaGEq6wksV9ZEOqtYHjEOu0pdjpuKtzmC9wxs8h4vSK-AaMhws7oqhKULhIARjq5kJWoiej_94gVy0rW5uuBe7dVRgMdHwLhT5YbAVaCX8DLc3uBIZ5wZz_bYU0'],
        specifications: { type: 'Headset' },
    },
    {
        name: 'Chroma Mat XXL',
        sku: 'ACC-MAT-CHROMA',
        category: 'accessory',
        basePrice: 4500,
        stockQuantity: 200,
        availabilityStatus: 'in_stock',
        shortDescription: 'Extended Size, RGB Borders, Speed Surface.',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCP8hKP1rgvy1hBQzyYWESs49gcnAPKlbXeGGMkXFULhboNCHM4N3dugtE5gNCdx1ejh93OPljbiKMWYxtvtAywRdeAV-_F1kNXonsboFPCKXQlYLayoD0NGFRL5L-iKK7VKxc_1N2LRsVgP7C8_vijVYyF-478-QZIXanUrczAbPiFD1hpeGXCMtUytip6X1788H7KLK-_ySu8t7TVMBcO0MVq0JMBS0I2f-gJSTnbcEun02VKui0EPbA9mhD05Zo70arettL1QOc'],
        specifications: { type: 'Mousepad' },
    },

    // --- PREBUILTS ---
    {
        name: 'RigMaster Beast Custom Build',
        sku: 'PRE-BEAST-V1',
        category: 'prebuilt',
        basePrice: 349900,
        stockQuantity: 10,
        availabilityStatus: 'in_stock',
        shortDescription: 'RTX 4090, i9-13900K, 64GB DDR5, Custom Loop',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCTjJXMzYXCcNvizauS0mmHqtPqmPtBEfynH5wXCaf7GkZL3mVDSeRqREkRD3h8BlayEu2TInQ-9g6__yDUmFEsz2ytSnNZhvvvMNUSAimPhqbgWUhpnuNBBq-Na26hc1aYkt5DlUuUkpU_1F6LUpQb4--N2hJ1yw3BGPhs3fJopc7HBA59mbRKFzqE1s_mdjJPtsmR4PzTey1FR_D4TuSO0fJEBaC2Ic4nEhOscE3uGw8ZKn4sHgaQdyjwzyRlJJK4rGbPUPcsIHI'],
        specifications: {
            gpu: 'RTX 4090',
            cpu: 'i9-13900K',
            ram: '64GB DDR5',
        },
    },
    {
        name: '27" 4K 144Hz Gaming Monitor',
        sku: 'ACC-MON-27-4K',
        category: 'accessory',
        basePrice: 59900,
        stockQuantity: 40,
        availabilityStatus: 'in_stock',
        shortDescription: 'IPS Panel, 1ms Response, HDR',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBA1VFmumZZcqp8HYlwxLyjRX2HqZ-v-TVlRu4MwOScZCiD3XzJbfMmRJS8hCi0c-lZNWJx2aMsgtdBBNm8YvB46r5A5J2lQjFACKCgqse2_rc4olw9gygd2chPI3h3VQJ0tiFiCl_BNaUbqgPRSK2px9I7NiHXV1cuRnxnocx8KuguBWDHnTSlCQy29RYNWV13HJtcgcUT3QMljcmpiuD6NFAxxZoSFnTiB9QuptFLJHmGJ45SV_eTpOTMpkAzG82Wk9aua_eMrMg'],
        specifications: { type: 'Monitor' },
    },
    {
        name: 'Mechanical Keyboard Pro',
        sku: 'ACC-KB-MECHPRO',
        category: 'accessory',
        basePrice: 12900,
        stockQuantity: 100,
        availabilityStatus: 'in_stock',
        shortDescription: 'Blue Switches, RGB Backlight',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAfi4Wba3Lo2Vzl83XXBdWyE_36vP1q9KYn343tpimiMpgOJV_TVAZeeVzL-PAGqTvbvXCx56ZyUuZZeYWRE7uy6hCBQqx2omqriV3KVX1U7RsVsO3u_DLR2wywmzFT6xKnikS0iAvuM8kC4ZW0JmoA_fRE5tpBRgMKpnhuykDK3NAktCillF9jG6Yj98qHtc63MHYbMno-f4C-1jcOh0UYP2BlG-T-AHRlwyMZZKndFrHlwjmm2mYByEa9k1T_sNS2U1vzqMXUZsY'],
        specifications: { type: 'Keyboard' },
    }
];

const additionalPrebuilts = [
    {
        name: 'RigMaster Pro X1',
        sku: 'PRE-PRO-X1',
        category: 'prebuilt',
        basePrice: 189900,
        stockQuantity: 15,
        availabilityStatus: 'in_stock',
        shortDescription: 'Intel Core i5-13600K, NVIDIA RTX 4070 12GB, 32GB DDR5',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDYx_49o9zOT-qDghYdQTgST4gyoPIxfn_AY5SJDn6udXWkA2YV3tdcLT_9Gjjl71vFAjTi5-HL6JcUlARiuINKpwD35F3wA_ZVbhqsUJ-HglSxTAmkf3N7AVwaFsNV73h_J97Hb92j6_OMb2ikBJz3iKz08DTHJmGro5vnVT6n4Q8ORpTuu0NZyNtwSs_4__dpcfIK3Ejbdc93MHYFt_MXE4M_Ot6YMj3RlCeULmQvagX3cWiDMch4hk8GzFQbULltJfTgF8650XQ'],
        specifications: {
            cpu: 'Intel Core i5-13600K',
            gpu: 'NVIDIA RTX 4070 12GB',
            ram: '32GB DDR5',
        },
    },
    {
        name: 'Snowblind Elite',
        sku: 'PRE-SNOW-ELITE',
        category: 'prebuilt',
        basePrice: 224900,
        stockQuantity: 8,
        availabilityStatus: 'in_stock',
        shortDescription: 'AMD Ryzen 7 7800X3D, Radeon RX 7900 XT, White Aesthetic',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB_dEd5iGm5jWWItZMZvPwudFKI8XIU0Qbs1CyX8B1snek6PMkuR0agtLqAvNKsl6-2HqgW2GKvyPdD2EJvuKsCkcIiFMlRGOrfQ9Z7kJTDGz9m0BFQS1gMfylZnl6HMkSl1waXst0vK5_-vcGZfT6ll2I736wh9_57IbDvLVNNThWcx3HcKiy1tMa5uqVJW2jmI48I0ZS-zB60ckk0HUev9-ChiLqJJSr4McjDDp81g2qEPtO1obvhYexk_b-I4PgGh37krBPeELc'],
        specifications: {
            cpu: 'Ryzen 7 7800X3D',
            gpu: 'Radeon RX 7900 XT',
            ram: '32GB DDR5',
        },
    },
    {
        name: 'Titan Leviathan',
        sku: 'PRE-TITAN-LEV',
        category: 'prebuilt',
        basePrice: 449900,
        stockQuantity: 3,
        availabilityStatus: 'in_stock',
        shortDescription: 'Intel i9-14900K, RTX 4090 24GB, 64GB DDR5, Custom Loop',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCIakHlrZ33T4y0eSuIS7tlD2D_XcNotwakJImgNDVP6Wqc43xGq9N5mF3wnRMCKTu5dWzC3dYUpCvlXxJJaFTCFFClHubdebV-9lTsL7OSn-VUjONQhujD7oKQd4x9zNaHAW01S4uFLtL5qFip2i_vwvggBTW8wr1VDN_18YZBG0iiCAO4iWY8VhCXGDryuGZxH3pG8nh_6ZU_4o7iyyjO1nSHDBzVPanZozlSAqYJYMjmA0M6vQ534L3NSKgpXXDRucvsMZtNzzU'],
        specifications: {
            cpu: 'i9-14900K',
            gpu: 'RTX 4090 24GB',
            ram: '64GB DDR5',
        },
    },
    {
        name: 'Creator Studio Mini',
        sku: 'PRE-CREATOR-MINI',
        category: 'prebuilt',
        basePrice: 314900,
        stockQuantity: 10,
        availabilityStatus: 'in_stock',
        shortDescription: 'Ryzen 9 7950X, RTX 4080 Super, Compact Form Factor',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBC6SVN0CJDNH3Ih599SCSwfadKMcsBXBw7JCRtIucpb_eDpDFX71RPOrJHgoIiCcRAhOEqTFc_1O0uIzh_9Mjy2sxEaqaQNrVcFcQZCiLWEa4GGcMhD9fnMWpgH98fUglB6C852ZFV0agRVJbqhljr1O31YQ_yyeXpDoRNWfCcm0vLb9y5ba0QoNzKpB2iIkP9VNTcR3asjHwpVCcf4AJhjKKEegAzPtk6wom_KApXtVaImKacM6B-ZAmtCeBs7Liuh3m6tYil82Y'],
        specifications: {
            cpu: 'Ryzen 9 7950X',
            gpu: 'RTX 4080 Super',
            ram: '64GB DDR5',
        },
    },
];

products.push(...additionalPrebuilts);

async function seed() {
    try {
        await connectDb();
        console.log('Connected to DB');

        // Clear existing products of similar SKUs to avoid duplicates
        const skus = products.map(p => p.sku);
        await Product.deleteMany({ sku: { $in: skus } });
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log('Inserted products');

        await disconnectDb();
        console.log('Done');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
