const { execSync } = require('child_process');

const envs = {
  MONGODB_URI: 'mongodb+srv://arkadmin:Ryomensukuna1@cluster0.ornlhs8.mongodb.net/?appName=Cluster0',
  NEXT_PUBLIC_RAZORPAY_KEY_ID: 'rzp_test_SPierWD12WfrVv',
  RAZORPAY_KEY_SECRET: 'OZubRpSYCGf9ikM1xVYqOqmu'
};

const targets = ['production', 'preview', 'development'];

for (const [name, value] of Object.entries(envs)) {
  for (const target of targets) {
    try {
      console.log(`Removing ${name} from ${target}...`);
      execSync(`vercel env rm ${name} ${target} --yes`, { stdio: 'ignore' });
    } catch (e) {}
    
    console.log(`Adding ${name} to ${target}...`);
    execSync(`vercel env add ${name} ${target}`, { input: value });
  }
}
console.log('Done!');
