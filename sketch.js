let idleSprite; // 儲存角色待機動畫的精靈圖。
let walkSprite; // 儲存角色行走動畫的精靈圖。
let characterX; // 記錄角色在畫布中的水平位置。
let facingDirection = 1; // 記錄角色朝向；1 為右，-1 為左。
const idleSpriteWidth = 185; // 設定待機精靈圖整張圖片的寬度。
const idleFrameHeight = 72; // 設定待機精靈圖中每一格的高度。
const idleFrameCount = 5; // 設定待機動畫的格數。
const walkSpriteWidth = 307; // 設定行走精靈圖整張圖片的寬度。
const walkFrameHeight = 71; // 設定行走精靈圖中每一格的高度。
const walkFrameCount = 8; // 設定行走動畫的格數。
const animationSpeed = 100; // 設定動畫每隔 100 毫秒切換一格。
const movementSpeed = 4; // 設定角色每次繪圖時移動的像素數。
const characterDisplayScale = 2; // 設定角色顯示尺寸為原精靈圖單格的兩倍。

function preload() { // 在畫布建立前載入角色圖片。
  idleSprite = loadImage("2/stop/stop.png"); // 載入待機動畫精靈圖。
  walkSprite = loadImage("2/walk/walk.png"); // 載入行走動畫精靈圖。
} // 結束圖片載入函式。

function setup() { // 設定畫布與角色初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合目前視窗大小的全螢幕畫布。
  characterX = width / 2; // 將角色初始位置放在畫布水平中央。
} // 結束初始設定函式。

function draw() { // 每一影格更新並繪製畫面。
  background("#edf2fb"); // 使用指定的淡藍色清除畫面背景。

  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查目前是否按住鍵盤右方向鍵。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查目前是否按住鍵盤左方向鍵。
  const horizontalInput = Number(movingRight) - Number(movingLeft); // 將按鍵狀態轉成右移、靜止或左移的方向值。
  const isWalking = horizontalInput !== 0; // 判斷角色目前是否正在移動。
  const frameWidth = isWalking ? walkSpriteWidth / walkFrameCount : idleSpriteWidth / idleFrameCount; // 依精靈圖總寬度和格數計算每格寬度。
  const frameHeight = isWalking ? walkFrameHeight : idleFrameHeight; // 依動畫狀態選擇精靈圖每格高度。
  const displayWidth = frameWidth * characterDisplayScale; // 計算放大後角色單格的顯示寬度。
  const displayHeight = frameHeight * characterDisplayScale; // 計算放大後角色單格的顯示高度。
  const frameCount = isWalking ? walkFrameCount : idleFrameCount; // 依動畫狀態選擇精靈圖格數。
  const activeSprite = isWalking ? walkSprite : idleSprite; // 依動畫狀態選擇要繪製的精靈圖。
  const frameIndex = floor(millis() / animationSpeed) % frameCount; // 計算目前動畫格並循環播放。

  if (isWalking) { // 只有按下左右方向鍵時才更新角色位置。
    facingDirection = horizontalInput; // 讓角色面向目前移動的方向。
    characterX += horizontalInput * movementSpeed; // 依按鍵方向移動角色。
  } // 結束角色移動判斷。

  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制放大後的角色不會移出畫布左右邊界。

  push(); // 暫存目前的繪圖座標與變形設定。
  translate(characterX, height / 2); // 將繪圖原點移至角色目前位置與畫布垂直中央。
  scale(facingDirection, 1); // 角色朝左時水平翻轉精靈圖。
  image( // 繪製目前動畫格，並裁切精靈圖中其他格子。
    activeSprite, // 指定目前狀態使用的精靈圖。
    -displayWidth / 2, // 從角色中心向左移半個顯示寬度，讓放大後的圖片置中。
    -displayHeight / 2, // 從角色中心向上移半個顯示高度，讓放大後的圖片置中。
    displayWidth, // 將單格動畫以原寬度的兩倍顯示。
    displayHeight, // 將單格動畫以原高度的兩倍顯示。
    frameIndex * frameWidth, // 設定精靈圖中目前動畫格的水平起點。
    0, // 設定精靈圖中目前動畫格的垂直起點。
    frameWidth, // 設定從精靈圖裁切的單格寬度。
    frameHeight // 設定從精靈圖裁切的單格高度。
  ); // 結束目前動畫格的繪製。
  pop(); // 還原繪圖座標與變形設定，避免影響其他繪製。
} // 結束畫面更新函式。

function windowResized() { // 視窗大小改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個視窗。
  characterX = constrain(characterX, walkSpriteWidth / walkFrameCount * characterDisplayScale / 2, width - walkSpriteWidth / walkFrameCount * characterDisplayScale / 2); // 依放大後的寬度調整角色位置，避免縮小視窗後角色超出邊界。
} // 結束視窗尺寸調整函式。
