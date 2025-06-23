---
title: "普物下(電路學)筆記"
date: 2025-06-23
tags: [學習]
hidden: false
---

# 普物下(電路學)筆記

作者：NCUEE 許彧嘉  
日期：2025/6/23

---

## 目錄

- [物理常數與重要符號](#物理常數與重要符號)
- [易混淆觀念小提醒](#易混淆觀念小提醒)
- [基本公式與定義](#基本公式與定義)
- [電路：RL、RC、LC、RLC 電路](#電路rlrclcrlc-電路)
- [交流電路與阻抗](#交流電路與阻抗)
- [靜電學與高斯定律](#靜電學與高斯定律)
- [麥克斯威方程組](#麥克斯威方程組)
- [常用向量微積分公式](#常用向量微積分公式)

---

## 物理常數與重要符號

- $$\epsilon_0$$：真空介電常數，$$\epsilon_0 = 8.85 \times 10^{-12}\ \mathrm{F\,m^{-1}}$$
- $$\mu_0$$：真空磁導率，$$\mu_0 = 4\pi \times 10^{-7}\ \mathrm{N\,A^{-2}}$$
- $$c$$：光速，$$c = 3.00 \times 10^8\ \mathrm{m/s}$$
- $$k_e$$：庫倫常數，$$k_e = \frac{1}{4\pi \epsilon_0} = 8.99 \times 10^9\ \mathrm{N\,m^2\,C^{-2}}$$
- $$q$$：電荷量，單位：$$\mathrm{C}$$
- $$I$$：電流，單位：$$\mathrm{A}$$
- $$V$$：電壓或電勢差，單位：$$\mathrm{V}$$
- $$R$$：電阻，單位：$$\Omega$$
- $$C$$：電容，單位：$$\mathrm{F}$$
- $$L$$：電感，單位：$$\mathrm{H}$$
- $$B$$：磁場，單位：$$\mathrm{T}$$
- $$E$$：電場，單位：$$\mathrm{V\,m^{-1}}$$
- $$A$$：截面積或向量面積
- $$\Phi_B$$：磁通量
- $$\mathcal{E}$$：感應電動勢
- $$n$$：單位體積帶電粒子數密度／螺線管單位長度圈數（依情境）
- $$N$$：總圈數

---

## 易混淆觀念小提醒

- **感應電動勢 $$\mathcal{E}$$ 與端電壓 $$V$$**：$$\mathcal{E}$$ 指閉合路徑上的總感應電動勢，端電壓 $$V$$ 為元件兩端的電壓，兩者含義不同。
- **線圈圈數 $$n$$ vs. $$N$$**：$$n$$ 表示「單位長度」圈數（如螺線管），$$N$$ 表示「總圈數」。
- **電流方向與電子運動方向相反**：計算時以「正電荷流動方向」為正。
- **向量公式注意**：$$\vec{F} = q(\vec{v} \times \vec{B})$$ 為向量叉積，方向由右手定則判斷。

---

## 基本公式與定義

### 電流密度、導體

$$
J = \frac{I}{A}
$$

$$
I = n q v_d A
$$

- $$n$$：單位體積內帶電粒子數量  
- $$v_d$$：漂移速度

### 電阻

$$
R = \rho \frac{l}{A}
$$

$$
V = IR
$$

### 歐姆定律

$$
I = \frac{V}{R}
$$

### 磁場與帶電粒子運動

$$
\vec{F} = q(\vec{v} \times \vec{B})
$$

$$
r = \frac{mv}{qB}
$$

- 圓周運動週期：$$T = \frac{2\pi m}{qB}$$
- 螺旋線 pitch：$$\text{Pitch} = v_{\parallel} T = v_{\parallel} \cdot \frac{2\pi m}{qB}$$

### 磁場與安培定律

$$
\oint \vec{B} \cdot d\vec{\ell} = \mu_0 I_{\text{enc}}
$$

### 磁場單位

$$
1~\mathrm{T} = 1~\frac{\mathrm{N}}{\mathrm{A}\cdot\mathrm{m}}
$$

### 通電導線／螺線管／環形線圈磁場

- 直線電流：$$B = \frac{\mu_0 I}{2\pi r}$$
- 圓形電流迴路中心：$$B = \frac{\mu_0 I}{2R}$$
- 長螺線管：$$B = \mu_0 n I$$
- 環形線圈（Toroid）：$$B = \frac{\mu_0 N I}{2\pi r}$$

### 電磁感應（法拉第定律與楞次定律）

$$
\mathcal{E} = -\frac{d\Phi_B}{dt}
$$

$$
U = -N \frac{d\Phi_B}{dt}
$$

$$
\Phi_B = \int \vec{B} \cdot d\vec{A}
$$

- **楞次定律**：感應電流方向總是反抗磁通量變化。

### 自感與電感（Inductor）

$$
L = \frac{N\Phi_B}{I}
$$

$$
L = \frac{\mu_0 N^2 A}{l}
$$

$$
\mathcal{E}_L = -L\frac{dI}{dt}
$$

$$
U_B = \frac{1}{2} L I^2
$$

### 電容、儲存能量

$$
Q = CV
$$

$$
U_C = \frac{1}{2} C V^2
$$

---

## 電路：RL、RC、LC、RLC 電路

### RC電路

- **充電：**
  $$
  q(t) = CV \left(1 - e^{-t/RC}\right)
  $$
  $$
  i(t) = \frac{V}{R} e^{-t/RC}
  $$
- **放電：**
  $$
  q(t) = Q_0 e^{-t/RC}
  $$
  $$
  i(t) = -\frac{Q_0}{RC} e^{-t/RC}
  $$
- **電容儲存能量：** $$U_C = \frac{1}{2}CV^2$$

### RL電路

- **通電：**
  $$
  i(t) = \frac{V}{R}(1 - e^{-t/\tau}),\quad \tau = \frac{L}{R}
  $$
- **斷電：**
  $$
  i(t) = I_0 e^{-t/\tau}
  $$
- **電感儲存能量：** $$U_L = \frac{1}{2} L I^2$$

### LC 與 RLC 電路

$$
\text{LC:}\quad Q = Q_0 \cos(\omega t + \phi),\quad \omega = \frac{1}{\sqrt{LC}}
$$

$$
\text{RLC:}\quad Q = Q_0 e^{-\gamma t} \cos(\omega' t + \phi)
$$

$$
\gamma = \frac{R}{2L}
$$

$$
\omega' = \sqrt{\frac{1}{LC} - \left(\frac{R}{2L}\right)^2}
$$

- RLC分類：
    - 欠阻尼：$$\omega' > 0$$
    - 臨界阻尼：$$\omega' = 0$$
    - 過阻尼：$$\omega' < 0$$

### 串聯與並聯電阻

- **串聯：** $$R_{\text{eq}} = R_1 + R_2 + \cdots$$
- **並聯：** $$\frac{1}{R_{\text{eq}}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots$$

---

## 交流電路與阻抗

### 交流電壓

$$
V(t) = V_{\text{max}} \sin(\omega t)
$$

### 電容元件

$$
V_C = V_{\text{max}} \sin(\omega t)
$$

$$
q_C = CV_{\text{max}} \sin(\omega t)
$$

$$
i_C = \frac{dq}{dt} = \omega C V_{\text{max}} \cos(\omega t)
$$

$$
X_C = \frac{1}{\omega C}
$$

$$
I_{\text{max}} = \frac{V_{\text{max}}}{X_C}
$$

### 電感元件

$$
V_L = L \frac{di}{dt}
$$

$$
X_L = \omega L
$$

$$
I_{\text{max}} = \frac{V_{\text{max}}}{X_L}
$$

### RLC並聯

$$
V_{\text{max}}^2 = (I_{\text{max}} R)^2 + (I_{\text{max}} X_L - I_{\text{max}} X_C)^2
$$

$$
X = \sqrt{X_L^2 + X_C^2}
$$

### 相位關係

- $$X_L > X_C$$：電流落後電壓（感性）
- $$X_L = X_C$$：電流與電壓同相（共振）
- $$X_L < X_C$$：電流超前電壓（容性）

---

## 靜電學與高斯定律

### 庫倫定律

$$
F = k_e \frac{|q_1 q_2|}{r^2},\quad k_e = \frac{1}{4\pi \epsilon_0} = 8.99\times 10^9~\mathrm{N\,m^2\,C^{-2}}
$$

### 電場與電勢

$$
E = \frac{F}{q} = k_e \frac{|q|}{r^2}
$$

$$
V = k_e \frac{q}{r}
$$

$$
\vec{E} = -\nabla V
$$

$$
\Delta V = -\int_{A}^{B} \vec{E} \cdot d\vec{\ell}
$$

### 高斯定律

$$
\oint \vec{E} \cdot d\vec{A} = \frac{q_{\text{enc}}}{\epsilon_0}
$$

### 導體性質

- 導體內部無電場
- 導體表面電場垂直
- 導體表面為等位面

### 電容器

$$
Q = CV,\quad C = \epsilon_0 \frac{A}{d}
$$

$$
U = \frac{1}{2}CV^2
$$

- 並聯電容：$$C_{\text{eq}} = C_1 + C_2 + \cdots$$
- 串聯電容：$$\frac{1}{C_{\text{eq}}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots$$

---

## 麥克斯威方程組

$$
\boxed{
\begin{aligned}
    &\text{(1) 高斯定律} && \nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0} \\
    &\text{(2) 無磁單極} && \nabla \cdot \vec{B} = 0 \\
    &\text{(3) 法拉第電磁感應} && \nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t} \\
    &\text{(4) 安培–馬克士威定律} && \nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}
\end{aligned}
}
$$

---

## 常用向量微積分公式

- **散度定理（Gauss's Theorem）：**

  $$
  \int_V (\nabla \cdot \vec{A})\, dV = \oint_{\partial V} \vec{A} \cdot d\vec{A}
  $$

- **斯托克斯定理（Stokes' Theorem）：**

  $$
  \int_S (\nabla \times \vec{A}) \cdot d\vec{A} = \oint_{\partial S} \vec{A} \cdot d\vec{\ell}
  $$


