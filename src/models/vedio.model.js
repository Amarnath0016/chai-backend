import mongoose,{Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // cloudinary url
      required: true
    },
    thumbnail: {
      type: String, // cloudinary url
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      default: null,
      trim: true
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    likesCount: {
      type: Number,
      default: 0
    },
    dislikesCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    duration: {
      type: Number,
      required: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    isPublished: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }


     

  },
  {
    timestamps: true
  }
)

videoSchema.plugin(mongoosePaginate);

export const Video = mongoose.model("Video", videoSchema);
