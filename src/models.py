from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
import enum
from .database import Base

class ActionType(str, enum.Enum):
    MODIFY = "MODIFY"
    DELETE = "DELETE"
    CREATE = "CREATE"

class Developer(Base):
    __tablename__ = "developers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)

class ProjectFile(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filepath = Column(String, unique=True, index=True)

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, index=True)
    developer_id = Column(Integer, ForeignKey("developers.id"))
    file_id = Column(Integer, ForeignKey("files.id"))
    action_type = Column(Enum(ActionType))
    lines_added = Column(Integer, default=0)
    lines_deleted = Column(Integer, default=0)

    developer = relationship("Developer")
    file = relationship("ProjectFile")
