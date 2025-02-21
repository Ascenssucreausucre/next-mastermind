import { Button } from "@mantine/core";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Mastermind</h1>
        <div style={{ textAlign: "center", display: "flex", justifyContent: "space-between", width: '100%', maxWidth: "300px"}}>
          <Button 
            variant="filled" 
            component="a" 
            href={'/mastermind'} >Jouer</Button>
          <Button 
            variant="outline"
            component="a" 
            href={'/game'}>Tableau des scores</Button>
        </div>
        </main>
    </div>
  );
}
