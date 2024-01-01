from typing import Dict, Any
from sqlalchemy.orm import Session
from models.sqlalchemy_models.alchemy_mod import User
from sqlalchemy import desc

class UserRepository:

    def __init__(self, sess: Session):
        self.sess: Session = sess

    def insert_user(self, user: User) -> bool:
        try:
            self.sess.add(user)
            self.sess.commit()
            print(user.id_user)
            
        except:
            return False
        
        return True

    def update_user(self, id: int, details: Dict[str, Any]) -> bool:
        try:
            self.sess.query(User).filter(User.id_user == id).update(details)
            self.sess.commit()

        except:
            return False
        return True

    def delete_user(self, id: int) -> bool:
        try:
            user = self.sess.query(User).filter(User.id_user == id).first()
            if user:
                self.sess.delete(user)
                self.sess.commit()
                return True
            else:
                print(f"User with ID {id} not found.")
                return False
            
        except Exception as e:
            print(f"Error deleting user: {e}")
            self.sess.rollback()  # Rollback changes if an exception occurs
            return False

    def get_all_accounts(self):
        return self.sess.query(User).all()
    
    def get_account(self, id:int): 
        return self.sess.query(User).filter(User.id_user == id).one_or_none()