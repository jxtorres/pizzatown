import MainScene from "./scenes/MainScene";


export function swapLevel(scene: MainScene): void
{
    if(scene.levelName === "street")
    {
        loadShopLevel(scene);
    }
    else
    {
        loadStreetLevel(scene);
    }

}

export function loadShopLevel(scene: MainScene): void
{
    cleanUpLevelBounds(scene);
    //removeBgImage()
    if(scene.bg)
        scene.bg.destroy();
    let bg = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, 'shop');
    scene.bg = bg;
    const scaleX = Number(scene.sys.game.config.width) / bg.width;
    const scaleY = Number(scene.sys.game.config.height) / bg.height;
    const scale = Math.min(scaleX, scaleY);
    scene.bg.setScale(scale);

    bg.setDepth(-10);
    scene.levelBounds = [];

    scene.exit = [876, 1179];
    scene.levelName = "shop";
    scene.hero.setX(876);
    scene.hero.setY(900);
}

export function loadStreetLevel(scene: MainScene): void
{
    cleanUpLevelBounds(scene);
    //removeBgImage()
    if(scene.bg)
        scene.bg.destroy();
    let bg = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, 'street');
    bg.setDepth(-10);
    scene.bg = bg;
    scene.levelBounds = [];
    createStreetBounds(scene)
    //scene.image.load(); 

    scene.exit = [760, 607];
    scene.levelName = "street";

    scene.hero.setX(760);
    scene.hero.setY(710);
    

}

function cleanUpLevelBounds(scene: MainScene): void
{
    //scene.levelBounds.push([im, col]);
    for(let i = 0; i < scene.levelBounds.length; ++i)
    {
        scene.levelBounds[i][0].destroy();
        scene.levelBounds[i][1].destroy();
    }
    scene.levelBounds = [];

}

function createStreetBounds(scene: MainScene) {
    const startStopPoints = [[ -300.1372538536932    , 1156.015625],
    [ 1494.2690724405238    , 1111.015625],
    [ -100.0163236211351685    , 756.015625],
    [ -100.016786955359529    , 350.015625],


    [ 20.03161365053907    , 727.015625],
    [ 250.05176868929874    , 726.015625],



    [ 160.05478036175708    , 550.015625],
    [ 160.05640203154235    , 360.015625],



    [ 248.07308206361932    , 569.015625],
    [ 455.093237102379    , 571.015625],


    [ 333.09277376815464    , 588.015625],
    [ 335.093237102379    , 448.015625],

    [ 460.1465205381804    , 705.015625],
    [ 880.1954022988505    , 706.015625], //pizza shop entrance





    [ 779.196097300187    , 487.015625],
    [ 783.1970239686358    , 258.015625],

    [ 861.2150940033858    , 491.015625],
    [ 1100.2327007039115    , 491.015625],
    [ 942.2338590394725    , 454.015625],
    [ 939.2331640381359    , 177.015625],



    [ 1060.2530874097833    , 720.015625], //last front facade
    [ 1460.2693041076361    , 720.015625],
    [ 1180.2693041076361    , 700.015625],
    [ 1180.2688407734117    , 100.015625]];

    
    for(let i = 0; i < startStopPoints.length; i++){
        //use first point
        let center = startStopPoints[i];
        //use second point
        i++;
        let stop = startStopPoints[i];
        if(Math.abs(stop[0] - center[0]) > Math.abs(stop[1] - center[1]))
        {
            //horizontal boundary
            // Desired size
            const desiredWidth = Math.abs(stop[0] - center[0]);
            const desiredHeight = 5;

            // Calculate scale factors
            let scaleX = desiredWidth / 2;
            let scaleY = desiredHeight / 2;
            let im = scene.physics.add.staticImage(center[0] + 250, center[1], 'white').setScale(scaleX, scaleY).setVisible(false);
            scaleX = desiredWidth / im.width;
            scaleY = desiredHeight / im.height;
            im.setScale(scaleX, scaleY);
            let col = scene.physics.add.collider(scene.hero, im);
            im.body.setSize(desiredWidth, desiredHeight);
            scene.levelBounds.push([im, col]);
        }
        else
        {
            //vertical
            // Desired size
            const desiredWidth = 5;
            const desiredHeight = Math.abs(stop[1] - center[1]);

            // Calculate scale factors
            let scaleX = desiredWidth / 2;
            let scaleY = desiredHeight / 2;
            let im = scene.physics.add.staticImage(center[0] + 360, center[1], 'white').setScale(scaleX, scaleY).setVisible(false);
            scaleX = desiredWidth / im.width;
            scaleY = desiredHeight / im.height;
            im.setScale(scaleX, scaleY);
            let col = scene.physics.add.collider(scene.hero, im);
            im.body.setSize(desiredWidth, desiredHeight);
            scene.levelBounds.push([im, col]);
        }
    }


    // Create four barriers for top, bottom, left, and right
    // let topBarrier = scene.physics.add.staticImage(726, 700, 'white').setScale(0.2, 0.1).setVisible(true);
    // let bottomBarrier = scene.physics.add.staticImage(30, 0, 'white').setScale(0.1, 0.1).setVisible(true);
    // let leftBarrier = scene.physics.add.staticImage(300, 300, 'white').setScale(0.02, 0.02).setVisible(true);
    // let rightBarrier = scene.physics.add.staticImage(30, 50, 'white').setScale(0.1, 0.1).setVisible(true);

    // scene.physics.add.collider(scene.hero, topBarrier);
    // scene.physics.add.collider(scene.hero, bottomBarrier);
    // scene.physics.add.collider(scene.hero, leftBarrier);
    // scene.physics.add.collider(scene.hero, rightBarrier);
}